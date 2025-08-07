import type { Response } from 'express';
import { prisma } from '../lib/prisma';
import { sendSuccess, sendError } from '../utils/response';
import { ERROR_CODES, ERROR_MESSAGES } from '../constants/errors';
import type { AuthenticatedRequest, UserLanguagePayload } from '../types';

export const getUserProfile = async (
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

    // 獲取使用者資料和進度
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        progress: {
          include: {
            stage: true,
          },
        },
      },
    });

    if (!user) {
      sendError(
        res,
        ERROR_CODES.USER_NOT_FOUND,
        ERROR_MESSAGES[ERROR_CODES.USER_NOT_FOUND],
        404
      );
      return;
    }

    // 獲取所有關卡
    const allStages = await prisma.stage.findMany({
      where: { isActive: true },
      orderBy: { stageNumber: 'asc' },
    });

    // 構建進度資料
    const progress = allStages.map((stage) => {
      const userProgress = user.progress.find((p) => p.stageId === stage.id);
      const language = user.language as 'zh' | 'en';

      return {
        stage_id: stage.id,
        stage_title: language === 'zh' ? stage.titleZh : stage.titleEn,
        passed: userProgress?.passed || false,
      };
    });

    sendSuccess(res, {
      nickname: user.nickname,
      email: user.email,
      language: user.language,
      profileImage: user.profileImage,
      progress,
    });
  } catch (error) {
    console.error('取得使用者個人資料錯誤:', error);
    sendError(
      res,
      ERROR_CODES.INTERNAL_ERROR,
      ERROR_MESSAGES[ERROR_CODES.INTERNAL_ERROR],
      500
    );
  }
};

export const updateUserLanguage = async (
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
    const { language }: UserLanguagePayload = req.body;

    // 更新使用者語言
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { language },
      include: {
        progress: {
          include: {
            stage: true,
          },
        },
      },
    });

    // 獲取所有關卡
    const allStages = await prisma.stage.findMany({
      where: { isActive: true },
      orderBy: { stageNumber: 'asc' },
    });

    // 構建進度資料
    const progress = allStages.map((stage) => {
      const userProgress = updatedUser.progress.find(
        (p) => p.stageId === stage.id
      );

      return {
        stage_id: stage.id,
        stage_title: language === 'zh' ? stage.titleZh : stage.titleEn,
        passed: userProgress?.passed || false,
      };
    });

    sendSuccess(res, {
      nickname: updatedUser.nickname,
      email: updatedUser.email,
      language: updatedUser.language,
      progress,
    });
  } catch (error) {
    console.error('更新使用者語言設定錯誤:', error);
    sendError(
      res,
      ERROR_CODES.INTERNAL_ERROR,
      ERROR_MESSAGES[ERROR_CODES.INTERNAL_ERROR],
      500
    );
  }
};
