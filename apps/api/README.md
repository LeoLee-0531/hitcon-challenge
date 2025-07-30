# HITCON Challenge API

這是 HITCON 闖關活動的後端 API 服務。

## 功能特色

- **使用者認證**: Google OAuth 2.0 登入
- **管理員認證**: 密碼登入系統
- **關卡管理**: 密碼驗證闖關機制
- **獎勵系統**: QR Code 領獎機制
- **統計功能**: 完整的活動數據統計
- **多語言支援**: 中英文內容切換
- **安全防護**: Rate limiting, CORS, Helmet 保護
- **API 文件**: Swagger/OpenAPI 3.0 自動生成文件

## 技術棧

- **後端框架**: Express.js + TypeScript
- **資料庫**: MongoDB + Prisma ORM
- **認證**: JWT + Google OAuth 2.0
- **安全**: bcrypt 密碼加密
- **驗證**: Joi 參數驗證
- **API 文件**: swagger-jsdoc + swagger-ui-express

## API 文件

本專案整合了 Swagger UI，提供完整的 API 文件：

- **文件位置**: http://localhost:3001/api-docs
- **格式**: OpenAPI 3.0
- **內容**: 包含所有端點、參數、回應格式和範例

### 🔒 安全防護

API 文件在生產環境中會自動禁用：

```bash
# 開發/測試環境：Swagger 可用
NODE_ENV=development

# 生產環境：Swagger 自動禁用
NODE_ENV=production
```

### 📚 相關文件

- API 使用指南: [API-DOCS.md](./API-DOCS.md)
- Response Headers 說明: [RESPONSE-HEADERS.md](./RESPONSE-HEADERS.md)

## 快速開始

### 1. 安裝依賴

```bash
cd apps/api
pnpm install
```

### 2. 環境設定

複製環境變數範例檔案：

```bash
cp .env.example .env
```

編輯 `.env` 檔案，設定以下必要變數：

```env
# Database
DATABASE_URL="mongodb://localhost:27017/hitcon-challenge"

# JWT Secrets (請替換為安全的隨機字串)
JWT_SECRET="your-super-secret-jwt-key"
ADMIN_JWT_SECRET="your-super-secret-admin-jwt-key"

# Google OAuth (從 Google Cloud Console 取得)
GOOGLE_CLIENT_ID="your-google-client-id"

# Admin Password
ADMIN_DEFAULT_PASSWORD="SITCON2025"

# Server
PORT=3001
NODE_ENV="development"

# CORS
ALLOWED_ORIGINS="http://localhost:3000,http://localhost:3001"
```

### 3. 資料庫設定

產生 Prisma client：

```bash
cd ../../
pnpm db:generate
```

推送資料庫結構：

```bash
pnpm db:push
```

建立初始資料：

```bash
pnpm run seed
```

### 4. 啟動開發伺服器

```bash
cd apps/api
pnpm dev
```

伺服器將在 http://localhost:3001 啟動。

## API 端點

### 認證

- `POST /api/auth/google` - Google OAuth 登入
- `POST /api/auth/admin/login` - 管理員登入

### 使用者

- `GET /api/user/profile` - 查詢個人資料與闖關進度
- `POST /api/user/language` - 切換語言偏好

### 關卡

- `GET /api/stages` - 查詢所有關卡資訊
- `POST /api/stages/verify` - 闖關密碼驗證

### 獎勵

- `POST /api/reward/qrcode` - 產生個人 QR Code
- `GET /api/reward/status` - 查詢獎勵狀態

### 管理員

- `POST /api/admin/reward/claim` - 兌換獎勵
- `POST /api/admin/reward/reset` - 重設獎勵狀態
- `GET /api/admin/statistics/overview` - 總覽統計
- `GET /api/admin/statistics/stages` - 關卡統計
- `GET /api/admin/statistics/rewards` - 獎勵統計

## 測試資料

執行 seed 後會建立以下測試資料：

### 管理員帳戶

- 帳號: `admin`
- 密碼: `SITCON2025` (可透過環境變數修改)

### 測試使用者

1. **user1@example.com** (測試使用者一) - 已通過 5 關並領取獎勵
2. **user2@example.com** (Test User Two) - 已通過 3 關
3. **user3@example.com** (測試使用者三) - 已通過所有 7 關

### 關卡密碼

1. `flag{hitcon_physical_flag}` - 實體 Flag 蒐集
2. `flag{prompt_injection_master}` - Prompt Injection 挑戰
3. `flag{web_security_ninja}` - Web 安全挑戰
4. `flag{reverse_engineering_pro}` - 逆向工程
5. `flag{crypto_wizard}` - 密碼學挑戰
6. `flag{forensics_detective}` - 數位鑑識
7. `flag{pwn_master_supreme}` - Binary Exploitation

## 開發指南

### 項目結構

```
src/
├── controllers/     # 控制器
├── middleware/      # 中間件
├── routes/         # 路由定義
├── lib/            # 核心功能庫
├── utils/          # 工具函數
├── types/          # TypeScript 類型定義
├── constants/      # 常數定義
├── schemas/        # 驗證 Schema
└── index.ts        # 應用程式入口
```

### 新增 API 端點

1. 在 `controllers/` 中建立控制器函數
2. 在 `routes/` 中定義路由
3. 在 `schemas/` 中定義驗證規則
4. 在主應用程式中註冊路由

### 錯誤處理

所有 API 回應都遵循統一格式：

**成功回應:**

```json
{
  "success": true,
  "data": { ... }
}
```

**錯誤回應:**

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

## 部署

### 生產環境設定

1. 設定環境變數
2. 建立生產資料庫
3. 執行 Prisma 遷移
4. 設定反向代理 (Nginx)
5. 設定 SSL 憑證

### Docker 部署

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm build
EXPOSE 3001
CMD ["node", "dist/index.js"]
```

## 安全注意事項

- 定期更新 JWT Secret
- 使用 HTTPS
- 設定適當的 CORS 政策
- 監控 API 使用率
- 定期備份資料庫
- 保護敏感的環境變數

## 授權

本專案採用 ISC 授權條款。
