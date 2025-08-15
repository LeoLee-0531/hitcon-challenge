#!/bin/bash
set -e

# 清除 Next.js 產物與快取
rm -rf apps/web/.next

# 安裝依賴
pnpm install --frozen-lockfile

# 編譯前端
cd apps/web && pnpm run build
