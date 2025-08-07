/**
 * Google OAuth 工具函數
 */

import { env } from '../config/env';

export interface GoogleAuthConfig {
  clientId: string;
  redirectUri: string;
  scope: string[];
}

/**
 * Google OAuth 類別
 */
export class GoogleOAuth {
  private config: GoogleAuthConfig;

  constructor(config: GoogleAuthConfig) {
    this.config = config;
  }

  /**
   * 生成 Google OAuth 授權 URL
   */
  getAuthUrl(): string {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      response_type: 'code',
      scope: this.config.scope.join(' '),
      access_type: 'offline',
      prompt: 'consent',
      state: this.generateState(),
    });

    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }

  /**
   * 直接重導向到 Google OAuth 頁面
   */
  redirectToGoogle(): void {
    if (typeof window !== 'undefined') {
      window.location.href = this.getAuthUrl();
    }
  }

  /**
   * 生成隨機狀態字串
   */
  private generateState(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }
}

/**
 * 預設的 Google OAuth 配置
 */
export const createGoogleOAuth = (): GoogleOAuth => {
  const clientId = env.GOOGLE_CLIENT_ID;

  console.log('Environment check:', {
    clientId: clientId ? `${clientId.substring(0, 20)}...` : 'undefined',
    allEnvKeys: Object.keys(process.env).filter((key) =>
      key.startsWith('NEXT_PUBLIC')
    ),
  });

  if (!clientId) {
    console.error('Environment variables:', process.env);
    throw new Error(
      `NEXT_PUBLIC_GOOGLE_CLIENT_ID is not configured. Available NEXT_PUBLIC vars: ${Object.keys(
        process.env
      )
        .filter((key) => key.startsWith('NEXT_PUBLIC'))
        .join(', ')}`
    );
  }

  // 確保在瀏覽器環境中執行
  if (typeof window === 'undefined') {
    throw new Error('createGoogleOAuth must be called in browser environment');
  }

  // 使用固定的回調 URI，不依賴語言路徑
  // Google OAuth 回調後會重導向到正確的語言頁面
  const redirectUri = `${window.location.origin}/auth/callback`;

  console.log('OAuth config:', {
    clientId: `${clientId.substring(0, 20)}...`,
    redirectUri,
    origin: window.location.origin,
  });

  return new GoogleOAuth({
    clientId,
    redirectUri,
    scope: ['openid', 'email', 'profile'],
  });
};
