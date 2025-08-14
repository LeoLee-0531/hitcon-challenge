/**
 * 環境變數驗證和配置
 * 在應用程式啟動時驗證所有必要的環境變數
 */

interface RequiredEnvVars {
  JWT_SECRET: string;
  DATABASE_URL: string;
  AUTH_GOOGLE_ID: string;
  AUTH_GOOGLE_SECRET: string;
}

interface OptionalEnvVars {
  PORT?: string;
  NODE_ENV?: string;
  FRONTEND_URL?: string;
  API_BASE_URL?: string;
}

/**
 * 驗證並返回所有必要的環境變數
 * 如果有任何必要的環境變數缺失，會拋出錯誤並終止應用程式
 */
export function validateEnvironmentVariables(): RequiredEnvVars &
  OptionalEnvVars {
  const requiredVars: (keyof RequiredEnvVars)[] = [
    'JWT_SECRET',
    'DATABASE_URL',
    'AUTH_GOOGLE_ID',
    'AUTH_GOOGLE_SECRET',
  ];

  const missingVars: string[] = [];

  // 檢查必要的環境變數
  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      missingVars.push(varName);
    }
  }

  if (missingVars.length > 0) {
    console.error(
      `
應用程式啟動失敗！缺少必要的環境變數：${missingVars.join(', ')}
請檢查您的環境配置並在 .env 文件中設定所有必要的變數後重新啟動應用程式。
    `.trim()
    );
    process.exit(1);
  }

  // 返回驗證過的環境變數
  return {
    JWT_SECRET: process.env.JWT_SECRET as string,
    DATABASE_URL: process.env.DATABASE_URL as string,
    AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID as string,
    AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET as string,
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    FRONTEND_URL: process.env.FRONTEND_URL,
    API_BASE_URL: process.env.API_BASE_URL,
  };
}

// 導出驗證後的環境變數配置
export const env = validateEnvironmentVariables();

// 便利的常數導出
export const JWT_SECRET = env.JWT_SECRET;
export const DATABASE_URL = env.DATABASE_URL;
export const AUTH_GOOGLE_ID = env.AUTH_GOOGLE_ID;
export const AUTH_GOOGLE_SECRET = env.AUTH_GOOGLE_SECRET;
export const PORT = env.PORT;
export const NODE_ENV = env.NODE_ENV;
export const FRONTEND_URL = env.FRONTEND_URL;
export const API_BASE_URL = env.API_BASE_URL;

// 為了相容性，提供別名
export const GOOGLE_CLIENT_ID = AUTH_GOOGLE_ID;
export const ALLOWED_ORIGINS = env.FRONTEND_URL; // CORS 使用前端 URL
