// 這是一個示例文件，展示如何使用重構後的類型系統
// 可以在前端或其他應用中這樣使用共用類型

import {
  ApiResponse,
  GoogleTokenPayload,
  UserData,
  JWTUserPayload,
} from './index'; // 在同一個包內使用相對路徑

// 示例：使用共用的 API 回應類型
const exampleApiResponse: ApiResponse<UserData> = {
  success: true,
  data: {
    id: '123',
    email: 'user@example.com',
    nickname: 'Test User',
    language: 'zh',
  },
};

// 示例：使用共用的請求 payload 類型
const exampleGoogleAuth: GoogleTokenPayload = {
  google_token: 'example-token',
};

// 示例：使用共用的 JWT payload 類型
const exampleJWTPayload: JWTUserPayload = {
  id: '123',
  email: 'user@example.com',
  nickname: 'Test User',
  language: 'zh',
};

console.log('Types are working correctly!');
