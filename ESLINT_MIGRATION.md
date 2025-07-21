# ESLint 配置遷移到 eslint.config.mjs (TypeScript 專用)

## 更改內容

### 1. 刪除舊配置文件

- 刪除了根目錄的 `.eslintrc.json`
- 刪除了 `apps/api/.eslintrc.json`
- 刪除了 `.eslintignore` (忽略規則已集成到新配置中)

### 2. 創建 TypeScript 優化的 ESLint 配置文件

#### 根目錄 - `/eslint.config.mjs`

- **專門針對 TypeScript 項目優化**
- 支援 TypeScript 和 TSX 文件
- 包含 Prettier 集成
- 配置 Node.js 和現代 JavaScript 環境變數
- 設定忽略規則 (node_modules, .next, dist, build, coverage, _.config.js, _.config.mjs)

#### API 應用 - `/apps/api/eslint.config.mjs`

- **Node.js TypeScript API 專用配置**
- 支援 TypeScript 嚴格模式
- 包含 TypeScript 項目引用 (`project: './tsconfig.json'`)
- Node.js 環境優化
- 特殊規則：允許 `require()` 用於 Node.js 兼容性

#### Web 應用 - `/apps/web/eslint.config.mjs`

- **Next.js + TypeScript 專用配置**
- 繼承 Next.js core-web-vitals 規則
- TypeScript + React/JSX 支援
- 包含 TypeScript 項目引用
- React 組件專用的 TypeScript 規則

### 3. TypeScript 專用功能

#### 🎯 **TypeScript 嚴格規則**

- `@typescript-eslint/no-unused-vars`: 未使用變數警告
- `@typescript-eslint/no-explicit-any`: any 類型警告
- `@typescript-eslint/no-non-null-assertion`: 非空斷言警告
- `@typescript-eslint/no-inferrable-types`: 可推斷類型警告

#### 📦 **導入優化**

- `@typescript-eslint/consistent-type-imports`: 強制使用類型導入

  ```typescript
  // ✅ 推薦
  import type { User } from './types';
  import { fetchUser } from './api';

  // ❌ 避免
  import { User, fetchUser } from './types';
  ```

#### 🔧 **TypeScript 編譯器集成**

- 使用 `project: './tsconfig.json'` 啟用類型感知 linting
- ECMAScript 2022 支援
- 自動類型檢查

### 4. 更新 package.json 文件

#### 根目錄

- 添加了 TypeScript ESLint 相關依賴項
- TypeScript 編譯器集成依賴

#### API 應用

- 添加了完整的 lint 和 format 腳本
- TypeScript 專用的 ESLint 和 Prettier 依賴項

#### Web 應用

- Next.js 與 TypeScript 集成依賴
- React TypeScript 專用的格式化腳本

### 5. 可用腳本

```bash
# 在根目錄執行所有項目的 TypeScript lint
pnpm lint

# 執行格式化（包含 TypeScript 文件）
pnpm format

# 檢查 TypeScript 格式化
pnpm format:check

# 在單個項目中
cd apps/api
pnpm lint          # TypeScript API 專用檢查
pnpm lint:fix      # 自動修復 TypeScript 問題
pnpm format        # 格式化 TypeScript 文件
pnpm format:check

cd apps/web
pnpm lint          # Next.js + TypeScript 檢查
pnpm lint:fix      # 自動修復 React TypeScript 問題
pnpm format        # 格式化 React TypeScript 文件
pnpm format:check
```

## TypeScript 專用配置特點

### 🚀 **性能優化**

1. **類型感知 linting**: 使用 TypeScript 編譯器進行更準確的檢查
2. **項目引用**: 每個子項目使用自己的 `tsconfig.json`
3. **現代 JavaScript**: ECMAScript 2022 支援

### 📝 **代碼品質**

1. **類型安全**: 強制 TypeScript 最佳實踐
2. **導入優化**: 分離類型和值的導入
3. **未使用代碼檢測**: 更精確的 TypeScript 未使用變數檢測

### 🎯 **專案特化**

1. **API 項目**: Node.js TypeScript 環境優化
2. **Web 項目**: React + Next.js TypeScript 環境優化
3. **通用規則**: 跨項目一致性

### ⚙️ **開發體驗**

1. **VS Code 集成**: 完美支援 TypeScript IntelliSense
2. **自動修復**: 大多數 TypeScript 問題可自動修復
3. **實時檢查**: 開發時即時 TypeScript 錯誤反饋

## 注意事項

- ✅ 所有開發者需使用 ESLint 9+ 和 TypeScript 5+
- ✅ 建議在 VS Code 中安裝 ESLint 和 TypeScript 擴展
- ✅ 可在 VS Code 設定中啟用保存時自動修復和格式化
- ✅ 確保每個子項目都有正確的 `tsconfig.json` 配置
- ⚠️ TypeScript 項目引用可能會稍微增加 linting 時間，但提供更好的類型檢查
