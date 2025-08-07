import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { OAuth2Client } from 'google-auth-library';
import { prisma } from '../lib/prisma';
import { verifyGoogleToken } from '../lib/google-auth';
import { generateUserToken, generateAdminToken } from '../lib/jwt';
import { sendSuccess, sendError } from '../utils/response';
import { ERROR_CODES, ERROR_MESSAGES } from '../constants/errors';
import { GOOGLE_CLIENT_ID, FRONTEND_URL } from '../config/env';
import type {
  GoogleTokenPayload,
  AdminLoginPayload,
  GoogleCodePayload,
} from '../types';

// 共用的使用者處理邏輯
const handleGoogleUser = async (googleUser: any) => {
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

  return user;
};

export const googleAuth = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { google_token }: GoogleTokenPayload = req.body;

    // 驗證 Google token
    const googleUser = await verifyGoogleToken(google_token);

    // 處理使用者資料
    const user = await handleGoogleUser(googleUser);

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
      profileImage: user.profileImage,
    });
  } catch (error) {
    console.error('Google 登入錯誤:', error);
    sendError(
      res,
      ERROR_CODES.GOOGLE_AUTH_FAILED,
      ERROR_MESSAGES[ERROR_CODES.GOOGLE_AUTH_FAILED],
      401
    );
  }
};

export const googleOAuthCallback = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { code }: GoogleCodePayload = req.body;

    if (!code) {
      sendError(
        res,
        ERROR_CODES.INVALID_PARAMS,
        'Authorization code is required',
        400
      );
      return;
    }

    // 創建 Google OAuth2 客戶端
    const oauth2Client = new OAuth2Client(
      GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      `${FRONTEND_URL}/auth/callback` // 使用通用回調路由
    );

    // 使用授權碼取得 tokens
    const { tokens } = await oauth2Client.getToken(code);

    if (!tokens.id_token) {
      throw new Error('No ID token received from Google');
    }

    // 驗證 ID token
    const googleUser = await verifyGoogleToken(tokens.id_token);

    // 處理使用者資料
    const user = await handleGoogleUser(googleUser);

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
      profileImage: user.profileImage,
    });
  } catch (error) {
    console.error('Google OAuth callback 錯誤:', error);
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

    // 驗證管理員是否存在以及密碼是否正確
    const isValidAdmin =
      admin && (await bcrypt.compare(password, admin.password));

    if (!isValidAdmin) {
      sendError(
        res,
        ERROR_CODES.INVALID_CREDENTIALS,
        ERROR_MESSAGES[ERROR_CODES.INVALID_CREDENTIALS],
        401
      );
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
    console.error('管理員登入錯誤:', error);
    sendError(
      res,
      ERROR_CODES.INTERNAL_ERROR,
      ERROR_MESSAGES[ERROR_CODES.INTERNAL_ERROR],
      500
    );
  }
};
