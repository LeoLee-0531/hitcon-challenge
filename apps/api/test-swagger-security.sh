#!/bin/bash

echo "🔒 Swagger 安全防護測試"
echo "=============================="

# 設定測試變數
API_URL="http://localhost:3001"
DOCS_PATH="/api-docs"

echo ""
echo "📋 測試項目："
echo "1. 基本存取測試"
echo "2. 密碼保護測試" 
echo "3. IP 限制測試"
echo "4. 環境變數測試"
echo ""

# 測試 1: 基本存取
echo "🧪 測試 1: 基本存取"
response=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL$DOCS_PATH")
echo "回應碼: $response"

if [ "$response" = "200" ]; then
    echo "✅ Swagger 可正常存取"
elif [ "$response" = "404" ]; then
    echo "❌ Swagger 已被禁用"
elif [ "$response" = "401" ]; then
    echo "🔐 需要認證"
elif [ "$response" = "403" ]; then
    echo "🚫 存取被拒絕"
else
    echo "❓ 未知狀態: $response"
fi

echo ""
echo "🧪 測試 2: 密碼保護"
# 測試錯誤密碼
response=$(curl -s -o /dev/null -w "%{http_code}" -u "swagger:wrong_password" "$API_URL$DOCS_PATH")
echo "錯誤密碼回應碼: $response"

# 測試正確密碼（假設密碼是 test123）
response=$(curl -s -o /dev/null -w "%{http_code}" -u "swagger:test123" "$API_URL$DOCS_PATH")
echo "正確密碼回應碼: $response"

echo ""
echo "🧪 測試 3: Headers 檢查"
echo "檢查安全性 Headers..."
curl -I -s "$API_URL/" | grep -E "(X-Content-Type-Options|X-Frame-Options|Access-Control)"

echo ""
echo "💡 提示："
echo "- 基本模式: SWAGGER_PROTECTION_LEVEL=basic"
echo "- 密碼保護: SWAGGER_PROTECTION_LEVEL=password"
echo "- IP 限制: SWAGGER_PROTECTION_LEVEL=ip"
echo "- 管理員: SWAGGER_PROTECTION_LEVEL=admin"
echo "- 生產環境: SWAGGER_PROTECTION_LEVEL=production"
echo ""
echo "🔧 環境變數範例："
echo "export SWAGGER_PROTECTION_LEVEL=password"
echo "export SWAGGER_PASSWORD=your_secure_password"
echo ""
