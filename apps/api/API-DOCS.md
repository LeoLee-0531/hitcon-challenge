# HITCON Challenge API Documentation

本專案已整合 Swagger/OpenAPI 3.0 來自動生成 API 文件。

## 啟動 API 服務器

```bash
# 開發模式
pnpm dev

# 或者指定帶文件的開發模式
pnpm dev:docs
```

## 查看 API 文件

啟動服務器後，您可以通過以下 URL 訪問 API 文件：

- **Swagger UI**: http://localhost:3001/api-docs
- **API 根路徑**: http://localhost:3001/
- **健康檢查**: http://localhost:3001/health

## API 文件特色

### 📚 完整的 API 端點文件

- **身份驗證 (Authentication)**: Google OAuth 和管理員登入
- **使用者 (User)**: 個人資料查詢和語言設定
- **關卡 (Stages)**: 關卡列表查詢和密碼驗證
- **獎勵 (Rewards)**: QR Code 生成和領取狀態查詢
- **管理員 (Admin)**: 獎勵管理和統計資料
- **健康檢查 (Health)**: 系統狀態檢查

### 🔐 安全性說明

- JWT Bearer Token 身份驗證
- 管理員和使用者權限區分
- 詳細的錯誤回應格式
- **生產環境自動禁用**: Swagger 在生產環境中自動關閉

### 📤 Response Headers

API 回應包含以下重要 Headers：

- **安全性 Headers**: 由 Helmet 提供 (X-Content-Type-Options, X-Frame-Options 等)
- **CORS Headers**: 跨來源資源共享設定 (Access-Control-Allow-Origin 等)
- **Rate Limiting**: 請求限制資訊 (X-RateLimit-Limit, X-RateLimit-Remaining 等)

詳細說明請參考 [RESPONSE-HEADERS.md](./RESPONSE-HEADERS.md)

### 📊 回應格式

所有 API 回應都遵循統一格式：

```json
{
  "success": true,
  "data": {
    // 實際資料
  },
  "timestamp": "2023-12-01T10:00:00.000Z"
}
```

錯誤回應格式：

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "錯誤訊息",
    "timestamp": "2023-12-01T10:00:00.000Z"
  }
}
```

## 開發指南

### 新增 API 端點

1. 在對應的路由文件中添加 Swagger 註解：

```typescript
/**
 * @swagger
 * /api/your-endpoint:
 *   post:
 *     summary: 端點描述
 *     description: 詳細說明
 *     tags: [YourTag]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               field:
 *                 type: string
 *     responses:
 *       200:
 *         description: 成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 */
```

2. 如需要新的 Schema，請在 `src/config/swagger.ts` 的 `components.schemas` 中添加。

### 更新 API 文件

API 文件會自動根據程式碼中的 Swagger 註解更新，無需手動維護。

## 生產環境

在生產環境中，建議：

1. 設定環境變數 `NODE_ENV=production`
2. 更新 `src/config/swagger.ts` 中的生產環境 server URL
3. 考慮是否要在生產環境中啟用 API 文件（基於安全考量）

## 技術細節

- **swagger-jsdoc**: 從 JSDoc 註解生成 OpenAPI 規範
- **swagger-ui-express**: 提供 Swagger UI 介面
- **OpenAPI 3.0**: 使用最新的 API 規範標準

## 相關連結

- [OpenAPI 3.0 規範](https://swagger.io/specification/)
- [Swagger UI 文件](https://swagger.io/tools/swagger-ui/)
- [swagger-jsdoc GitHub](https://github.com/Surnet/swagger-jsdoc)
