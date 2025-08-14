import type { Response, Request } from 'express';
import { prisma } from '../lib/prisma';
import { sendSuccess, sendError } from '../utils/response';
import { ERROR_CODES, ERROR_MESSAGES } from '../constants/errors';
import type { AuthenticatedRequest } from '../types';
import { generateUserToken } from '../lib/jwt';

import { OAuth2Client } from 'google-auth-library';

export const loginUser = async (
  req: Request<object, object, { id_token: string }>,
  res: Response
) => {
  try {
    const { id_token } = req.body;
    if (!id_token) {
      sendError(res, ERROR_CODES.INVALID_PARAMS, '缺少 id_token', 400);
      return;
    }

    // 驗證 Google id_token
    const client = new OAuth2Client();
    let payload;
    try {
      const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: process.env.AUTH_GOOGLE_ID,
      });
      payload = ticket.getPayload();
    } catch (err) {
      sendError(
        res,
        ERROR_CODES.INVALID_GOOGLE_TOKEN,
        'Google id_token 驗證失敗',
        401
      );
      return;
    }

    const email = payload?.email;
    const name = payload?.name;
    const image = payload?.picture;
    if (!email || !name) {
      sendError(res, ERROR_CODES.INVALID_PARAMS, 'Google 帳號資訊不完整', 400);
      return;
    }

    const user = await prisma.user.upsert({
      where: { email },
      update: { name, image },
      create: { email, name, image, role: 'USER' },
    });

    const token = generateUserToken({
      id: user.id,
      email: user.email ?? '',
      name: user.name ?? '',
      role: user.role,
    });

    sendSuccess(res, { token });
  } catch (error) {
    console.error('使用者登入錯誤:', error);
    sendError(
      res,
      ERROR_CODES.INTERNAL_ERROR,
      ERROR_MESSAGES[ERROR_CODES.INTERNAL_ERROR],
      500
    );
  }
};

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

      return {
        stage_id: stage.id,
        stage_title: stage.title,
        passed: userProgress?.passed || false,
      };
    });

    sendSuccess(res, {
      name: user.name,
      email: user.email,
      image: user.image,
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
