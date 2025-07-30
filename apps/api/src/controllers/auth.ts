import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma';
import { verifyGoogleToken } from '../lib/google-auth';
import { generateUserToken, generateAdminToken } from '../lib/jwt';
import { sendSuccess, sendError } from '../utils/response';
import { ERROR_CODES, ERROR_MESSAGES } from '../constants/errors';
import type { GoogleTokenPayload, AdminLoginPayload } from '../types';

export const googleAuth = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { google_token }: GoogleTokenPayload = req.body;

    // 驗證 Google token
    const googleUser = await verifyGoogleToken(google_token);

    // 查找或創建使用者
    let user = await prisma.user.findUnique({
      where: { googleId: googleUser.sub },
    });

    if (!user) {
      // 檢查是否已存在相同 email 的使用者
      const existingUser = await prisma.user.findUnique({
        where: { email: googleUser.email },
      });

      if (existingUser) {
        // 更新現有使用者的 googleId
        user = await prisma.user.update({
          where: { email: googleUser.email },
          data: {
            googleId: googleUser.sub,
            nickname: googleUser.name,
            profileImage: googleUser.picture,
            lastLoginAt: new Date(),
          },
        });
      } else {
        // 創建新使用者
        user = await prisma.user.create({
          data: {
            googleId: googleUser.sub,
            email: googleUser.email,
            nickname: googleUser.name,
            profileImage: googleUser.picture,
            language: 'zh',
          },
        });
      }
    } else {
      // 更新最後登入時間
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          lastLoginAt: new Date(),
          nickname: googleUser.name,
          profileImage: googleUser.picture,
        },
      });
    }

    // 生成 JWT token
    const token = generateUserToken({
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      language: user.language,
    });

    sendSuccess(res, {
      user_token: token,
      user_id: user.id,
      nickname: user.nickname,
      email: user.email,
      language: user.language,
    });
  } catch (error) {
    console.error('Google auth error:', error);
    sendError(
      res,
      ERROR_CODES.GOOGLE_AUTH_FAILED,
      ERROR_MESSAGES[ERROR_CODES.GOOGLE_AUTH_FAILED],
      401
    );
  }
};

export const adminLogin = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { password }: AdminLoginPayload = req.body;

    // 查找管理員
    const admin = await prisma.admin.findFirst({
      where: { isActive: true },
    });

    if (!admin) {
      sendError(res, ERROR_CODES.UNAUTHORIZED, 'Invalid credentials', 401);
      return;
    }

    // 驗證密碼
    const isValidPassword = await bcrypt.compare(password, admin.password);

    if (!isValidPassword) {
      sendError(res, ERROR_CODES.UNAUTHORIZED, '密碼錯誤', 401);
      return;
    }

    // 更新最後登入時間
    await prisma.admin.update({
      where: { id: admin.id },
      data: { lastLoginAt: new Date() },
    });

    // 生成 JWT token
    const token = generateAdminToken({
      id: admin.id,
      username: admin.username,
    });

    sendSuccess(res, {
      admin_token: token,
    });
  } catch (error) {
    console.error('Admin login error:', error);
    sendError(
      res,
      ERROR_CODES.INTERNAL_ERROR,
      ERROR_MESSAGES[ERROR_CODES.INTERNAL_ERROR],
      500
    );
  }
};
