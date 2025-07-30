// 共用的 API 介面類型定義
// 這些類型可以被前端和後端共同使用

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    timestamp: string;
  };
}

// API 請求 payload 類型
export interface GoogleTokenPayload {
  google_token: string;
}

export interface AdminLoginPayload {
  password: string;
}

export interface UserLanguagePayload {
  language: 'zh' | 'en';
}

export interface StageVerifyPayload {
  stage_id: string;
  password: string;
}

export interface RewardClaimPayload {
  user_id: string;
}

// JWT payload 類型
export interface JWTUserPayload {
  id: string;
  email: string;
  nickname: string;
  language: string;
}

export interface JWTAdminPayload {
  id: string;
  username: string;
}

// 使用者資料類型
export interface UserData {
  id: string;
  email: string;
  nickname: string;
  language: string;
  profileImage?: string;
}

// 管理員資料類型
export interface AdminData {
  id: string;
  username: string;
}
