# Response Headers 控制說明

## 📋 Headers 控制位置

在 HITCON Challenge API 中，Response Headers 是在以下位置控制的：

### 1. 主要中間件設定 (`src/index.ts`)

```typescript
// 安全性 Headers (由 Helmet 控制)
app.use(helmet());

// CORS Headers (由 CORS 中間件控制)
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || [
      'http://localhost:3000',
    ],
    credentials: true,
  })
);

// Rate Limiting Headers (由 express-rate-limit 控制)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    /* ... */
  },
});
```

### 2. Response 工具函數 (`src/utils/response.ts`)

```typescript
// 統一回應格式，設定 Content-Type 和狀態碼
res.status(statusCode).json(response);
```

## 🔒 安全性 Headers (由 Helmet 設定)

| Header                         | 說明               | 預設值       |
| ------------------------------ | ------------------ | ------------ |
| `X-Content-Type-Options`       | 防止 MIME 類型嗅探 | `nosniff`    |
| `X-DNS-Prefetch-Control`       | 控制 DNS 預取      | `off`        |
| `X-Frame-Options`              | 防止點擊劫持       | `SAMEORIGIN` |
| `X-Powered-By`                 | 移除伺服器資訊     | (已移除)     |
| `Strict-Transport-Security`    | 強制 HTTPS         | 預設設定     |
| `Content-Security-Policy`      | 內容安全政策       | 預設設定     |
| `Cross-Origin-Embedder-Policy` | 跨來源嵌入政策     | 預設設定     |
| `Cross-Origin-Opener-Policy`   | 跨來源開啟政策     | 預設設定     |
| `Cross-Origin-Resource-Policy` | 跨來源資源政策     | 預設設定     |
| `Origin-Agent-Cluster`         | 來源代理集群       | 預設設定     |
| `Referrer-Policy`              | 推薦來源政策       | 預設設定     |

## 🌐 CORS Headers (由 CORS 中間件設定)

| Header                             | 說明         | 設定值           |
| ---------------------------------- | ------------ | ---------------- |
| `Access-Control-Allow-Origin`      | 允許的來源   | 根據環境變數設定 |
| `Access-Control-Allow-Credentials` | 允許憑證     | `true`           |
| `Access-Control-Allow-Methods`     | 允許的方法   | 自動設定         |
| `Access-Control-Allow-Headers`     | 允許的標頭   | 自動設定         |
| `Vary`                             | 快取變化標頭 | `Origin`         |

## ⏱️ Rate Limiting Headers (由 express-rate-limit 設定)

| Header                  | 說明                     | 範例值       |
| ----------------------- | ------------------------ | ------------ |
| `X-RateLimit-Limit`     | 每個時間窗口的最大請求數 | `100`        |
| `X-RateLimit-Remaining` | 剩餘可用請求數           | `95`         |
| `X-RateLimit-Reset`     | 下次重置時間             | `1638360000` |

## 📝 標準 HTTP Headers

| Header           | 說明     | 控制位置                              |
| ---------------- | -------- | ------------------------------------- |
| `Content-Type`   | 內容類型 | Express 自動設定 (`application/json`) |
| `Content-Length` | 內容長度 | Express 自動設定                      |
| `Date`           | 回應時間 | Express 自動設定                      |
| `Connection`     | 連線狀態 | Express 自動設定                      |

## 🔧 在 Swagger 中顯示 Headers

### 為什麼要在 Swagger 中顯示 Headers？

1. **API 文件完整性**: 讓開發者了解完整的 API 回應格式
2. **安全性透明度**: 展示 API 的安全性措施
3. **除錯輔助**: 幫助開發者理解 Rate Limiting 和 CORS 行為
4. **最佳實踐**: 符合 OpenAPI 規範的完整文件

### 已配置的 Headers

在 `src/config/swagger.ts` 中，已經定義了以下 Headers：

```typescript
components: {
  headers: {
    'X-RateLimit-Limit': { /* ... */ },
    'X-RateLimit-Remaining': { /* ... */ },
    'X-RateLimit-Reset': { /* ... */ },
    'Access-Control-Allow-Origin': { /* ... */ },
    'Access-Control-Allow-Credentials': { /* ... */ },
    'Content-Security-Policy': { /* ... */ },
    'X-Content-Type-Options': { /* ... */ },
    'X-Frame-Options': { /* ... */ },
  }
}
```

### 在路由中使用

```typescript
/**
 * @swagger
 * /api/auth/google:
 *   post:
 *     responses:
 *       200:
 *         headers:
 *           X-RateLimit-Limit:
 *             $ref: '#/components/headers/X-RateLimit-Limit'
 *           Access-Control-Allow-Origin:
 *             $ref: '#/components/headers/Access-Control-Allow-Origin'
 */
```

## 🛠️ 自定義 Headers

如果需要添加自定義 Headers，可以在以下位置設定：

### 1. 全域設定 (在 index.ts 中)

```typescript
app.use((req, res, next) => {
  res.setHeader('X-API-Version', '1.0.0');
  next();
});
```

### 2. 路由層級設定

```typescript
router.get('/endpoint', (req, res) => {
  res.setHeader('X-Custom-Header', 'value');
  res.json({ data: 'response' });
});
```

### 3. 控制器層級設定

```typescript
export const myController = (req: Request, res: Response) => {
  res.setHeader('X-Processing-Time', Date.now());
  sendSuccess(res, data);
};
```

## 📊 監控和測試

可以使用以下方式檢查 Headers：

```bash
# 檢查所有 Headers
curl -I http://localhost:3001/api/auth/google

# 檢查特定 Header
curl -H "Authorization: Bearer <token>" \
     -X GET http://localhost:3001/api/user/profile \
     -v 2>&1 | grep "< "
```

## 🎯 建議

1. **保持一致性**: 確保所有端點都有相同的安全性 Headers
2. **文件化重要 Headers**: 在 Swagger 中記錄與 API 行為相關的 Headers
3. **監控 Rate Limiting**: 注意 Rate Limiting Headers 的使用情況
4. **安全性檢查**: 定期檢查安全性 Headers 的設定
5. **環境區分**: 在不同環境中可能需要不同的 Headers 設定
