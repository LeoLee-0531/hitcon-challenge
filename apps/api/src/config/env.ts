/**
 * 環境變數驗證和配置
 * 在應用程式啟動時驗證所有必要的環境變數
 */

interface RequiredEnvVars {
  JWT_SECRET: string;
  ADMIN_JWT_SECRET: string;
  DATABASE_URL: string;
  NEXT_PUBLIC_GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
}

interface OptionalEnvVars {
  PORT?: string;
  NODE_ENV?: string;
  NEXT_PUBLIC_FRONTEND_URL?: string;
  NEXT_PUBLIC_API_BASE_URL?: string;
}

/**
 * 驗證並返回所有必要的環境變數
 * 如果有任何必要的環境變數缺失，會拋出錯誤並終止應用程式
 */
export function validateEnvironmentVariables(): RequiredEnvVars &
  OptionalEnvVars {
  const requiredVars: (keyof RequiredEnvVars)[] = [
    'JWT_SECRET',
    'ADMIN_JWT_SECRET',
    'DATABASE_URL',
    'NEXT_PUBLIC_GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
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
    ADMIN_JWT_SECRET: process.env.ADMIN_JWT_SECRET as string,
    DATABASE_URL: process.env.DATABASE_URL as string,
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env
      .NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  };
}

// 導出驗證後的環境變數配置
export const env = validateEnvironmentVariables();

// 便利的常數導出
export const {
  JWT_SECRET,
  ADMIN_JWT_SECRET,
  DATABASE_URL,
  NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  PORT,
  NODE_ENV,
  NEXT_PUBLIC_FRONTEND_URL,
  NEXT_PUBLIC_API_BASE_URL,
} = env;

// 為了相容性，提供別名
export const GOOGLE_CLIENT_ID = NEXT_PUBLIC_GOOGLE_CLIENT_ID;
export const FRONTEND_URL = NEXT_PUBLIC_FRONTEND_URL;
export const API_BASE_URL = NEXT_PUBLIC_API_BASE_URL;
export const ALLOWED_ORIGINS = NEXT_PUBLIC_FRONTEND_URL; // CORS 使用前端 URL
