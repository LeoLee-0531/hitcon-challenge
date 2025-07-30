/**
 * 環境變數驗證和配置
 * 在應用程式啟動時驗證所有必要的環境變數
 */

interface RequiredEnvVars {
  JWT_SECRET: string;
  ADMIN_JWT_SECRET: string;
  DATABASE_URL: string;
  GOOGLE_CLIENT_ID: string;
}

interface OptionalEnvVars {
  PORT?: string;
  NODE_ENV?: string;
  ALLOWED_ORIGINS?: string;
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
    'GOOGLE_CLIENT_ID',
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
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,
  };
}

// 導出驗證後的環境變數配置
export const env = validateEnvironmentVariables();

// 便利的常數導出
export const {
  JWT_SECRET,
  ADMIN_JWT_SECRET,
  DATABASE_URL,
  GOOGLE_CLIENT_ID,
  PORT,
  NODE_ENV,
  ALLOWED_ORIGINS,
} = env;
