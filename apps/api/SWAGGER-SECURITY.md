# 🛡️ Swagger API 文件安全防護指南

## ⚠️ 資安風險

公開的 Swagger 文件可能暴露：

- **API 端點結構**: 攻擊者了解所有可用的 API 路徑
- **參數格式**: 請求和回應的完整資料結構
- **認證機制**: 身份驗證的具體實作方式
- **業務邏輯**: 透過 API 設計推測應用程式邏輯
- **攻擊面**: 提供完整的系統攻擊地圖

## 🔒 多層次防護方案

### 1. 環境級別防護

```bash
# 生產環境完全禁用
SWAGGER_PROTECTION_LEVEL=production
NODE_ENV=production
```

### 2. 密碼保護

```bash
# Basic Auth 保護
SWAGGER_PROTECTION_LEVEL=password
SWAGGER_PASSWORD=your_secure_password
```

訪問方式：

```bash
# 瀏覽器會彈出認證對話框
# 使用者名稱: swagger
# 密碼: your_secure_password
```

### 3. IP 白名單保護

```bash
# 只允許特定 IP 存取
SWAGGER_PROTECTION_LEVEL=ip
SWAGGER_ALLOWED_IPS=127.0.0.1,192.168.1.100,10.0.0.50
```

### 4. 管理員認證保護

```bash
# 需要管理員 JWT Token
SWAGGER_PROTECTION_LEVEL=admin
```

訪問方式：

```bash
# 需要在 Authorization header 提供管理員 JWT
curl -H "Authorization: Bearer <admin_jwt_token>" \
     http://localhost:3001/api-docs
```

### 5. 時間限制保護

```bash
# 只在指定時間開放（24小時制）
SWAGGER_PROTECTION_LEVEL=time
SWAGGER_ALLOWED_HOURS=9,10,11,12,13,14,15,16,17
```

### 6. 全套防護

```bash
# 組合所有防護措施
SWAGGER_PROTECTION_LEVEL=full
SWAGGER_PASSWORD=secure_password
SWAGGER_ALLOWED_IPS=192.168.1.100
SWAGGER_ALLOWED_HOURS=9,10,11,12,13,14,15,16,17
```

## 🎯 建議的部署策略

### 開發環境

```bash
SWAGGER_PROTECTION_LEVEL=basic
NODE_ENV=development
```

- ✅ 完整的 API 文件
- ✅ 所有端點和範例
- ✅ 便於開發和測試

### 測試環境

```bash
SWAGGER_PROTECTION_LEVEL=password
SWAGGER_PASSWORD=test_env_password
NODE_ENV=staging
```

- ✅ 密碼保護
- ✅ 內部團隊可存取
- ✅ 防止外部洩露

### 生產環境

```bash
SWAGGER_PROTECTION_LEVEL=production
NODE_ENV=production
```

- ✅ 完全禁用 Swagger
- ✅ 零資訊洩露風險
- ✅ 最高安全性

### 內部 API 環境

```bash
SWAGGER_PROTECTION_LEVEL=full
SWAGGER_PASSWORD=internal_api_docs
SWAGGER_ALLOWED_IPS=10.0.0.0/8,192.168.0.0/16
SWAGGER_ALLOWED_HOURS=9,10,11,12,13,14,15,16,17
NODE_ENV=internal
```

- ✅ 多層防護
- ✅ 僅內網存取
- ✅ 工作時間限制

## 🚨 緊急停用方法

如果需要立即停用 Swagger：

### 方法 1: 環境變數

```bash
export SWAGGER_PROTECTION_LEVEL=production
# 或
export NODE_ENV=production
```

### 方法 2: 程式碼註解

```typescript
// app.use('/api-docs', ...); // 暫時註解掉
```

### 方法 3: 反向代理封鎖

```nginx
location /api-docs {
    return 404;
}
```

## 🔍 安全檢查清單

- [ ] 生產環境已禁用 Swagger
- [ ] 測試環境有適當的存取控制
- [ ] 密碼足夠複雜且定期更換
- [ ] IP 白名單定期檢查和更新
- [ ] 監控 Swagger 的存取日誌
- [ ] 確保敏感資訊不在 API 文件中暴露
- [ ] 定期檢查和更新安全設定

## 📊 監控和警示

建議設定以下監控：

```javascript
// 存取日誌記錄
app.use('/api-docs', (req, res, next) => {
  console.log(`[SWAGGER ACCESS] ${req.ip} - ${new Date().toISOString()}`);
  // 可以添加到日誌系統或發送警示
  next();
});
```

## 🛠️ 進階安全選項

### 1. 自定義路徑

```typescript
// 使用隨機或難以猜測的路徑
app.use('/internal-docs-x7k9m2', swaggerUi.serve, ...);
```

### 2. 動態路徑

```typescript
// 每次啟動使用不同路徑
const docsPath = `/docs-${Math.random().toString(36).substr(2, 9)}`;
app.use(docsPath, swaggerUi.serve, ...);
console.log(`Swagger available at: ${docsPath}`);
```

### 3. VPN 限制

```bash
# 只允許 VPN 網段存取
SWAGGER_ALLOWED_IPS=10.8.0.0/24
```

### 4. 雙因子認證

```typescript
// 結合現有的認證系統
app.use('/api-docs', requireTwoFactorAuth, swaggerUi.serve, ...);
```

## 📝 最佳實踐

1. **最小權限原則**: 只給需要的人存取權限
2. **定期審查**: 定期檢查誰有存取權限
3. **日誌監控**: 記錄所有存取嘗試
4. **版本控制**: API 文件的版本控制和變更追蹤
5. **敏感資訊**: 確保密碼、金鑰等不出現在文件中
6. **網路分層**: 使用防火牆和 VPN 額外保護
7. **緊急計畫**: 準備快速停用的方案

透過這些多層次的防護措施，可以大幅降低 Swagger 文件暴露的安全風險！🔒
