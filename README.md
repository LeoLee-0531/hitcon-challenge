## 專案架構概覽

本專案採用 Monorepo 結構，主要包含以下部分：

- `apps/web`: Next.js 前端應用程式，負責使用者介面、進度地圖、OAuth 登入流程及管理後台。
- `apps/api`: Express 後端 API 服務，負責所有資料處理、業務邏輯、與 MongoDB/Prisma 互動。
- `packages/types`: 共用 TypeScript 型別定義，確保前後端資料結構一致。
- `packages/utils`: 共用工具函式庫。
- `prisma`: Prisma 資料庫 Schema 及 Migration 檔案。
- `docs`: 專案相關文件（規格、API 文件、網站地圖、進度安排）。

## 開發環境設定

請依照以下步驟初始化你的本地開發環境：

### 1. 前置準備

- **Node.js**: 建議使用 LTS 版本 (v18 或 v20)。
- **pnpm**: 本專案使用 pnpm 作為套件管理器。如果尚未安裝，請執行：
  ```bash
  npm install -g pnpm
  ```
- **MongoDB**: 確保你的本地或遠端有一個 MongoDB 實例可供連接。

### 2. 取得專案程式碼

```bash
git clone https://github.com/LeoLee-0531/hitcon-challenge.git
cd hitcon-challenge
```

### 3. 安裝專案依賴

在專案根目錄執行以下指令，pnpm 會自動安裝所有 `apps` 和 `packages` 的依賴：

```bash
pnpm install
```

### 4. 環境變數設定

複製 `.env.example` 並將檔名替換成 `.env`，並修改環境變數

### 5. 資料庫初始化

執行 Prisma Migration，建立資料庫 Schema：

```bash
pnpm prisma generate
pnpm prisma migrate dev --name init
```

### 6. 啟動開發伺服器

#### 啟動後端 API 服務

在專案根目錄執行：

```bash
pnpm --filter api dev
```

後端服務預設會在 `http://localhost:3001` 啟動。

#### 啟動前端 Web 服務

在專案根目錄執行：

```bash
pnpm --filter web dev
```

前端服務預設會在 `http://localhost:3000` 啟動。

---

## Git 工作流程

⚠️ **重要提醒**：**絕對不要直接在 `main` 分支上進行開發或推送 commit！**

### 開發流程

1. **創建任務分支**：

   ```bash
   # 從 main 分支建立新的任務分支
   git checkout main
   git pull origin main
   git checkout -b feature/your-feature-name
   # 或
   git checkout -b fix/your-bug-fix-name
   ```

2. **進行開發**：
   - 在新分支上進行你的開發工作
   - 定期進行小的 commit

3. **提交前檢查**：
   在推送程式碼前，**必須**在專案根目錄執行以下檢查：

   ```bash
   # 程式碼格式化
   pnpm format

   # 程式碼檢查
   pnpm lint

   # 確認格式化是否正確
   pnpm format:check
   ```

   確保所有檢查都通過後再進行推送。

4. **推送分支並建立 PR**：

   ```bash
   git add .
   git commit -m "feat: your commit message"
   git push origin feature/your-feature-name
   ```

5. **建立 Pull Request**：
   - 前往 GitHub 建立 Pull Request
   - **重要**：請在 PR 中標記 (mention) 所有團隊成員進行程式碼審核
   - 在 PR description 中清楚描述你的變更內容

6. **等待審核**：
   - 等待至少一位團隊成員審核並 approve
   - 根據 review 意見進行必要的修改

7. **合併到 main**：
   - 審核通過後，才能將 PR 合併到 `main` 分支

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

---

## 開發指南

### 1. 程式碼規範

本專案使用 ESLint 和 Prettier 確保程式碼品質和一致性。

#### ESLint 和 Prettier 使用方法

**自動格式化程式碼**：

```bash
# 格式化所有專案檔案
pnpm format

# 檢查程式碼是否符合格式規範（不會自動修復）
pnpm format:check
```

**程式碼檢查**：

```bash
# 檢查所有專案的程式碼錯誤和風格問題
pnpm lint

# 針對特定 app 進行檢查
pnpm --filter web lint
pnpm --filter api lint
```

**開發建議**：

- 建議在 VS Code 中安裝 ESLint 和 Prettier 擴充功能
- 設定編輯器在儲存時自動格式化程式碼
- 遵循 TypeScript 最佳實踐
- 在提交程式碼前務必執行 `pnpm lint` 和 `pnpm format`

### 2. 共用模組 (packages)

- **型別 (types)**: 所有前後端共用的資料結構型別請定義在 `packages/types`。
- **工具 (utils)**: 共用的工具函式請定義在 `packages/utils`。
- 在 `apps/web` 或 `apps/api` 中引用共用模組，例如：
  ```typescript
  import { User } from 'types';
  import { formatDate } from 'utils';
  ```

### 3. API 開發

- 後端 API 邏輯位於 `apps/api/src`。
- 請參考 `docs/API 文件.md` 進行開發。
- 使用 Prisma 進行資料庫操作。

### 4. 前端開發

- 前端頁面和元件位於 `apps/web/app` 和 `apps/web/components`。
- 使用 Next.js App Router 進行頁面路由。
- 多語系 (i18n) 相關設定請參考 `apps/web/next-i18next.config.js` 及相關檔案。
- Google OAuth 登入請參考 `apps/web` 中的 `next-auth` 設定。

### 5. 資料庫管理

- 修改 `prisma/schema.prisma` 後，請執行 `pnpm prisma migrate dev` 來更新資料庫結構。

### 6. 開發工作流程提醒

- **分支命名規範**：
  - 功能開發：`feature/功能名稱`
  - 錯誤修復：`fix/錯誤描述`
  - 文件更新：`docs/文件說明`
  - 重構：`refactor/重構說明`

- **Commit 訊息規範**：
  - `feat: 新增功能描述`
  - `fix: 修復錯誤描述`
  - `docs: 文件更新描述`
  - `refactor: 重構描述`
  - `style: 程式碼格式調整`

- **Code Review 要求**：
  - 每個 PR 必須至少有一位團隊成員審核
  - 審核者需檢查程式碼邏輯、風格一致性和測試覆蓋率
  - 發現問題時請提供建設性的意見和建議

---

## 部署 (Production Deployment)

本專案的前後端服務可獨立部署：

- **前端 (Next.js)**: 建議部署至 Vercel 或其他支援 Next.js 的平台。
- **後端 (Express)**: 可部署至 Render, Heroku, AWS EC2, Google Cloud Run 或任何支援 Node.js 的伺服器。

部署前請確保生產環境的環境變數已正確配置。


1235645612312312