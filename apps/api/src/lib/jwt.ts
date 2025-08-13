import * as jwt from 'jsonwebtoken';
import type { JWTUserPayload } from '../types';
import { JWT_SECRET, ADMIN_JWT_SECRET } from '../config/env';

export const generateUserToken = (payload: JWTUserPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '2d' });
};

export const verifyUserToken = (token: string): JWTUserPayload => {
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    // 增加 payload 結構的檢查，確保它是一個物件且包含必要的欄位（例如 id）
    if (
      typeof payload === 'string' ||
      !payload ||
      typeof payload.id === 'undefined' ||
      typeof payload.role === 'undefined' ||
      (payload.role !== 'USER' && payload.role !== 'ADMIN')
    ) {
      throw new Error('無效的權杖內容');
    }
    return payload as JWTUserPayload;
  } catch (error) {
    console.error('使用者權杖驗證失敗：', error);
    throw new Error('無效或已過期的使用者權杖。');
  }
};
