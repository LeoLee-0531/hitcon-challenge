/**
 * 環境變數配置
 * 使用統一的 NEXT_PUBLIC_ 變數，前後端共用
 */

/**
 * 取得 API Base URL
 */
export const getApiBaseUrl = (): string => {
  return process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';
};

/**
 * 取得前端 URL
 */
export const getFrontendUrl = (): string => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }

  return process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000';
};

/**
 * 環境變數配置
 */
export const env = {
  // API 相關
  API_BASE_URL: getApiBaseUrl(),
  FRONTEND_URL: getFrontendUrl(),

  // Google OAuth
  GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,

  // 其他
  NODE_ENV: process.env.NODE_ENV,
} as const;
