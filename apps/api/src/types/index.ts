import { Request } from 'express';

// 重新導出共用類型，方便後端使用
export * from 'types';

// 後端專用的 Express 相關類型擴展
export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    nickname: string;
    language: string;
  };
  admin?: {
    id: string;
    username: string;
  };
}
