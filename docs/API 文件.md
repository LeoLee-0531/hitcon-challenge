# 闖關活動網站 API 文件

## 登入/註冊

- **使用者端**：Google OAuth 2.0 登入，需帶 access token
- **管理員端**：密碼登入，取得 admin token，後續 API 需帶入

### 使用者登入 (Google OAuth)

- `POST /api/auth/google`
- **說明**：前端傳 Google OAuth token，後端驗證並回傳 user token
- **請求參數**：
  ```json
  {
    "google_token": "ya29.a0ARrdaM9X..."
  }
  ```
- **回傳**：
  ```json
  {
    "success": true,
    "data": {
      "user_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user_id": "abc123",
      "nickname": "小明",
      "email": "user@example.com",
      "language": "zh"
    }
  }
  ```

### 管理員登入

- `POST /api/admin/login`
- **請求參數**：
  ```json
  {
    "password": "admin123"
  }
  ```
- **回傳**：
  ```json
  {
    "success": true,
    "data": {
      "admin_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
  ```

## 使用者管理

### 查詢個人資料 (包含闖關狀態)

- `GET /api/user/profile`
- **Header**: Authorization: Bearer user_token
- **回傳**：
  ```json
  {
    "success": true,
    "data": {
      "nickname": "小明",
      "email": "user@example.com",
      "language": "zh",
      "progress": [
        {
          "stage_id": 1,
          "stage_title": "實體 Flag 蒐集",
          "passed": true
        }
      ]
    }
  }
  ```

### 中英切換

- `POST /api/user/language`
- **說明**：設定使用者語言偏好
- **Header**: Authorization: Bearer user_token
- **請求參數**：
  ```json
  {
    "language": "zh"
  }
  ```
- **回傳**：
  ```json
  {
    "success": true,
    "data": {
      "nickname": "小明",
      "email": "user@example.com",
      "language": "zh",
      "progress": [
        {
          "stage_id": 1,
          "stage_title": "實體 Flag 蒐集",
          "passed": true
        }
      ]
    }
  }
  ```

## 關卡管理

### 查詢所有關卡資訊

- `GET /api/stages`
- **說明**：取得所有關卡資訊（依語言切換）
- **回傳**：
  ```json
  {
    "success": true,
    "data": [
      {
        "stage_id": 1,
        "stage_title": "實體 Flag 蒐集",
        "description": "在會場中找到隱藏的 Flag",
        "external_url": "https://..."
      }
    ]
  }
  ```

### 闖關密碼驗證

- `POST /api/stages/verify`
- **Header**: Authorization: Bearer user_token
- **請求參數**：
  ```json
  {
    "stage_id": 1,
    "password": "pA5sW0rd"
  }
  ```
- **回傳**：
  ```json
  {
    "success": true,
    "data": {
      "passed": true
    }
  }
  ```

## 獎勵與 QRcode 管理

### 產生個人 QRcode (User)

- **POST** `/api/reward/qrcode`
- **Header**: Authorization: Bearer user_token
- **說明**：產生專屬於該使用者的 QRcode，內容即為 userId
- **請求參數**：無
- **回傳**：
  ```json
  {
    "success": true,
    "data": {
      "qrcode_url": "https://api.qrserver.com/v1/create-qr-code/?data=abc123",
      "user_id": "abc123"
    }
  }
  ```

### 查詢獎勵狀態 (User/Admin)

- **GET** `/api/reward/status`
- **Header**：Authorization: Bearer user_token/admin_token
- **說明**：查詢分級獎勵狀態，管理員與闖關者皆可用
- **請求參數 (查詢特定闖關者狀態，僅管理員可用)**：
  ```json
  {
    "user_id": "abc123"
  }
  ```
- **回傳**：
  ```json
  {
    "success": true,
    "data": {
      "user_id": "abc123",
      "nickname": "小明",
      "passed_count": 5,
      "reward_claimed": true,
      "claimed_at": "2024-07-01T15:00:00Z"
    }
  }
  ```

### 兌換獎勵 (Admin Only)

- **POST** `/api/admin/reward/claim`
- **Header**: Authorization: Bearer admin_token
- **說明**：領取獎勵，每位使用者只能領取一次
- **請求參數**：
  ```json
  {
    "user_id": "abc123"
  }
  ```
- **回傳**：
  ```json
  {
    "success": true,
    "data": {
      "user_id": "abc123",
      "nickname": "小明",
      "passed_count": 5,
      "reward_claimed": true,
      "claimed_at": "2024-07-01T15:00:00Z"
    }
  }
  ```
- **錯誤回報**：
  ```json
  {
    "success": false,
    "error": {
      "code": "ALREADY_CLAIMED",
      "message": "該使用者已領取過獎勵"
    }
  }
  ```

### 重設獎勵狀態 (Admin Only)

- **POST** `/api/admin/reward/reset`
- **Header**: Authorization: Bearer admin_token
- **說明**：重設特定使用者的領獎狀態，讓其可再次領獎
- **請求參數**：
  ```json
  {
    "user_id": "abc123"
  }
  ```
- **回傳**：
  ```json
  {
    "success": true,
    "data": {
      "user_id": "abc123",
      "nickname": "小明",
      "passed_count": 5,
      "reward_claimed": false,
      "claimed_at": null
    }
  }
  ```

## 數據統計 (Admin Only)

### 總覽統計

- **GET** `/api/admin/statistics/overview`
- **Header**: Authorization: Bearer admin_token
- **說明**：取得活動整體統計概況
- **回傳**：
  ```json
  {
    "success": true,
    "data": {
      "total_users": 150,
      "completed_users": 45,
      "completion_rate": 0.3,
      "last_updated": "2024-07-01T15:30:00Z"
    }
  }
  ```

### 關卡統計

- **GET** `/api/admin/statistics/stages`
- **Header**: Authorization: Bearer admin_token
- **說明**：取得各關卡詳細統計
- **回傳**：
  ```json
  {
    "success": true,
    "data": {
      "stage_stats": [
        {
          "stage_id": 1,
          "stage_title": "實體 Flag 蒐集",
          "passed_count": 120,
          "pass_rate": 0.8
        },
        {
          "stage_id": 2,
          "stage_title": "Prompt Injection",
          "passed_count": 95,
          "pass_rate": 0.53
        }
      ]
    }
  }
  ```

### 獎勵統計

- **GET** `/api/admin/statistics/rewards`
- **Header**: Authorization: Bearer admin_token
- **說明**：取得獎勵領取統計
- **回傳**：
  ```json
  {
    "success": true,
    "data": {
      "total_eligible_users": 65,
      "total_claimed_count": 45,
      "claim_rate": 0.69
    }
  }
  ```

## 共用格式與錯誤碼

### 共用回傳格式

**成功：**

```json
{
  "success": true,
  "data": { ... },
}
```

**失敗：**

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "錯誤說明",
    "timestamp": "2024-07-01T12:00:00Z"
  }
}
```

### 常見錯誤碼

- `UNAUTHORIZED`：未授權或 token 無效
- `INVALID_PARAMS`：參數錯誤
- `NOT_FOUND`：資源不存在
- `ALREADY_PASSED`：已通關
- `WRONG_PASSWORD`：密碼錯誤
- `QRCODE_EXPIRED`：QRcode 已失效
- `FORBIDDEN`：無權限
- `INTERNAL_ERROR`：伺服器錯誤
- `ALREADY_CLAIMED`：已領取過獎勵
- `NOT_ELIGIBLE`：不符合領獎資格