import type { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { sendSuccess, sendError } from '../utils/response';
import { ERROR_CODES, ERROR_MESSAGES } from '../constants/errors';
import type { AuthenticatedRequest, StageVerifyPayload } from '../types';

export const getAllStages = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const language = (req.query.language as string) || 'zh';

    const stages = await prisma.stage.findMany({
      where: { isActive: true },
      orderBy: { stageNumber: 'asc' },
    });

    const stageData = stages.map((stage) => ({
      stage_id: stage.id,
      stage_title: language === 'zh' ? stage.titleZh : stage.titleEn,
      description:
        language === 'zh' ? stage.descriptionZh : stage.descriptionEn,
      external_url: stage.externalUrl,
    }));

    sendSuccess(res, stageData);
  } catch (error) {
    console.error('取得所有關卡錯誤:', error);
    sendError(
      res,
      ERROR_CODES.INTERNAL_ERROR,
      ERROR_MESSAGES[ERROR_CODES.INTERNAL_ERROR],
      500
    );
  }
};

export const verifyStagePassword = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      sendError(
        res,
        ERROR_CODES.UNAUTHORIZED,
        ERROR_MESSAGES[ERROR_CODES.UNAUTHORIZED]
      );
      return;
    }

    const userId = req.user.id;
    const { stage_id, password }: StageVerifyPayload = req.body;

    // 查找關卡
    const stage = await prisma.stage.findUnique({
      where: { id: stage_id, isActive: true },
    });

    if (!stage) {
      sendError(
        res,
        ERROR_CODES.STAGE_NOT_FOUND,
        ERROR_MESSAGES[ERROR_CODES.STAGE_NOT_FOUND],
        404
      );
      return;
    }

    // 檢查是否已通關
    const existingProgress = await prisma.userProgress.findUnique({
      where: {
        userId_stageId: {
          userId,
          stageId: stage_id,
        },
      },
    });

    if (existingProgress?.passed) {
      sendError(
        res,
        ERROR_CODES.ALREADY_PASSED,
        ERROR_MESSAGES[ERROR_CODES.ALREADY_PASSED]
      );
      return;
    }

    // 驗證密碼
    if (password !== stage.password) {
      sendError(
        res,
        ERROR_CODES.WRONG_PASSWORD,
        ERROR_MESSAGES[ERROR_CODES.WRONG_PASSWORD]
      );
      return;
    }

    // 創建或更新進度記錄
    await prisma.userProgress.upsert({
      where: {
        userId_stageId: {
          userId,
          stageId: stage_id,
        },
      },
      update: {
        passed: true,
        passedAt: new Date(),
      },
      create: {
        userId,
        stageId: stage_id,
        passed: true,
        passedAt: new Date(),
      },
    });

    sendSuccess(res, {
      passed: true,
    });
  } catch (error) {
    console.error('驗證關卡密碼錯誤:', error);
    sendError(
      res,
      ERROR_CODES.INTERNAL_ERROR,
      ERROR_MESSAGES[ERROR_CODES.INTERNAL_ERROR],
      500
    );
  }
};
