#!/bin/bash
set -e

# 安裝依賴
pnpm install --frozen-lockfile

# 生成 Prisma 客戶端
npx prisma generate --schema=prisma/schema.prisma

# 編譯 API
cd apps/api && pnpm run build
