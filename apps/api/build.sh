#!/bin/bash
set -e

# 清除所有未追蹤檔案與快取
git clean -fdx

# 清除快取與編譯產物
rm -rf apps/api/dist apps/api/tsconfig.tsbuildinfo apps/api/node_modules

pnpm install --frozen-lockfile

# 生成 Prisma 客戶端
npx prisma generate --schema=prisma/schema.prisma

# 部署 API
cd apps/api && pnpm run build