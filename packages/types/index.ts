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
  name: string;
  role: 'USER' | 'ADMIN';
}

// 使用者資料類型
export interface UserData {
  id: string;
  email: string;
  name: string;
  language: string;
  image?: string;
}

// 管理員資料類型
export interface AdminData {
  id: string;
  username: string;
}
