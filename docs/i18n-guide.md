# i18n 國際化實作說明

## 📋 概要

本專案使用 `next-intl` 套件實作國際化功能，支援繁體中文 (zh) 和英文 (en) 兩種語言。

## 🏗️ 架構說明

### 檔案結構

```
src/
├── i18n/
│   └── config.ts          # i18n 配置檔案
├── messages/              # 翻譯檔案目錄
│   ├── en.json           # 英文翻譯
│   └── zh.json           # 繁體中文翻譯
├── components/
│   ├── Navigation.tsx    # 帶有語言切換的導航欄
│   └── LanguageSwitcher.tsx # 語言切換器組件
├── hooks/
│   └── useI18n.ts        # 國際化相關 Hook
├── lib/
│   └── i18n.ts           # 國際化工具函數
├── types/
│   └── next-intl.d.ts    # TypeScript 類型定義
├── app/
│   ├── layout.tsx        # 根 Layout
│   └── [locale]/         # 語言特定路由
│       ├── layout.tsx    # 語言 Layout
│       ├── page.tsx      # 首頁
│       └── challenges/   # 挑戰頁面範例
└── middleware.ts         # 語言路由中間件
```

## 🚀 使用方法

### 1. 在組件中使用翻譯

```tsx
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('common');

  return (
    <div>
      <h1>{t('title')}</h1>
      <button>{t('submit')}</button>
    </div>
  );
}
```

### 2. 在 Server Component 中使用

```tsx
import { getTranslations } from 'next-intl/server';

export default async function ServerComponent() {
  const t = await getTranslations('home');

  return <h1>{t('welcome')}</h1>;
}
```

### 3. 帶參數的翻譯

在翻譯檔案中：

```json
{
  "challenges": {
    "solvedBy": "已有 {count} 隊解出"
  }
}
```

在組件中使用：

```tsx
const t = useTranslations('challenges');
// 顯示: "已有 42 隊解出"
<p>{t('solvedBy', { count: 42 })}</p>;
```

## 🔧 配置說明

### 支援的語言

- `zh`: 繁體中文 (預設)
- `en`: 英文

### 語言偵測

- 自動偵測瀏覽器語言設定
- 支援 URL 語言前綴 (如 `/en/`, `/zh/`)
- 使用 Cookie 記住使用者的語言選擇

### 路由結構

- `/` → 重新導向到 `/zh/`
- `/en/` → 英文版本
- `/zh/` → 繁體中文版本

## 📝 新增翻譯

### 1. 新增翻譯鍵值

在 `src/messages/` 目錄下的兩個 JSON 檔案中加入新的翻譯：

```json
// en.json
{
  "newSection": {
    "title": "New Section",
    "description": "This is a new section"
  }
}

// zh.json
{
  "newSection": {
    "title": "新區塊",
    "description": "這是一個新的區塊"
  }
}
```

### 2. 在組件中使用

```tsx
const t = useTranslations('newSection');
return <h2>{t('title')}</h2>;
```

## 🌍 新增語言支援

### 1. 修改配置

在 `src/i18n/config.ts` 中新增語言：

```typescript
export const locales = ['en', 'zh', 'ja'] as const;
```

### 2. 建立翻譯檔案

建立 `src/messages/ja.json`

### 3. 更新語言切換器

在 `src/components/LanguageSwitcher.tsx` 中新增語言名稱：

```typescript
const languageNames: Record<Locale, string> = {
  en: 'English',
  zh: '繁體中文',
  ja: '日本語', // 新增
};
```

### 4. 更新中間件

在 `src/middleware.ts` 中更新路由匹配規則：

```typescript
matcher: [
  '/',
  '/(zh|en|ja)/:path*', // 新增 ja
  '/((?!_next|_vercel|.*\\..*).*)',
];
```

## 🐛 常見問題

### 1. 翻譯沒有顯示

- 檢查翻譯鍵值是否存在於所有語言檔案中
- 確認 TypeScript 類型定義是否正確
- 檢查 `useTranslations` 的命名空間是否正確

### 2. 語言切換不工作

- 檢查 middleware 配置是否正確
- 確認路由結構是否符合預期
- 檢查瀏覽器開發者工具的網路請求

### 3. 建置錯誤

- 確保所有翻譯檔案的結構一致
- 檢查 TypeScript 類型定義
- 執行 `pnpm install` 確保依賴安裝正確

## 🔗 相關資源

- [next-intl 官方文件](https://next-intl-docs.vercel.app/)
- [Next.js 國際化指南](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
- [React Intl 格式化規則](https://formatjs.io/docs/core-concepts/icu-syntax/)

## 📋 待實作功能

- [ ] 日期時間格式化
- [ ] 數字格式化
- [ ] 複數形式處理
- [ ] 動態翻譯載入
- [ ] 翻譯管理後台
- [ ] SEO 優化 (hreflang 等)
