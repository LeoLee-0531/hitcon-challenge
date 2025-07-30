# HITCON Challenge

本專案為 HITCON Challenge 的 Monorepo 架構，包含一個 Next.js 前端和一個 Express 後端。

## 專案結構

- `apps/web`: Next.js 前端應用程式。
- `apps/api`: Express 後端 API。
- `packages/types`: 共用的 TypeScript 型別。
- `packages/utils`: 共用的工具函式。
- `prisma`: Prisma schema 和資料庫遷移檔案。
- `docs`: 專案文件。

## 開始使用

### 前置需求

- Node.js (v18 或 v20)
- pnpm
- MongoDB

### 安裝步驟

1.  **複製專案庫：**

    ```bash
    git clone https://github.com/LeoLee-0531/hitcon-challenge.git
    cd hitcon-challenge
    ```

2.  **安裝依賴套件：**

    ```bash
    pnpm install
    ```

3.  **設定環境變數：**
    複製 `.env.example` 為 `.env` 並填入所需的值。

4.  **初始化資料庫：**
    ```bash
    pnpm prisma generate
    pnpm prisma migrate dev --name init
    ```

## 開發

### 啟動開發伺服器

- **啟動後端 API：**

  ```bash
  pnpm --filter api dev
  ```

  (運行於 `http://localhost:3001`)

- **啟動前端 Web 應用程式：**
  ```bash
  pnpm --filter web dev
  ```
  (運行於 `http://localhost:3000`)

### 程式碼品質

- **格式化程式碼：**

  ```bash
  pnpm format
  ```

- **檢查程式碼：**
  ```bash
  pnpm lint
  ```

## Git 工作流程

1.  從 `main` 分支建立一個 feature 或 fix 分支。
    ```bash
    git checkout -b feature/your-feature-name
    ```
2.  進行變更。
3.  在提交前，執行 `pnpm format` 和 `pnpm lint`。
4.  推送您的分支並建立一個指向 `main` 的 Pull Request。
5.  請團隊成員進行審查。
6.  審核通過後，合併 PR。

### PR 範本

為確保 Pull Request 的品質和一致性，請使用以下範本建立 PR：

```markdown
## 變更類型

<!-- 請勾選適用的類型 -->

- [ ] ✨ 新功能 (feature)
- [ ] 🐛 錯誤修復 (bug fix)
- [ ] 📚 文件更新 (documentation)
- [ ] 🎨 程式碼重構 (refactor)
- [ ] ⚡ 效能優化 (performance)
- [ ] 🧪 測試相關 (test)
- [ ] 🔧 工具/配置變更 (tooling)

## 變更詳情

<!-- 詳細描述你做了什麼改變，為什麼要做這些改變 -->

## 測試清單

<!-- 請確認已完成以下檢查 -->

- [ ] 程式碼已通過 ESLint 檢查 (`pnpm lint`)
- [ ] 程式碼已格式化 (`pnpm format`)
- [ ] 已在本地測試相關功能
- [ ] 已更新相關文件（如需要）
- [ ] 已添加或更新測試（如需要）

## 截圖/錄影

<!-- 如果有 UI 變更，請提供截圖或錄影 -->

## 相關 Issue

<!-- 如果這個 PR 解決了某個 issue，請在此提及 -->

Closes #issue_number

## 備註

<!-- 任何其他需要審核者注意的事項 -->
```

## 部署

- **前端 (Next.js):** 部署至 Vercel 或任何支援 Next.js 的平台。
- **後端 (Express):** 部署至 Render、Heroku 或任何 Node.js 託管服務。

部署前請確保已正確設定生產環境的環境變數。