const { specs } = require('./dist/config/swagger');

// 簡單測試 Swagger 配置是否正確
console.log('=== Swagger 配置測試 ===');
console.log('OpenAPI 版本:', specs.openapi);
console.log('API 標題:', specs.info?.title);
console.log('API 版本:', specs.info?.version);
console.log('Servers 數量:', specs.servers?.length);
console.log('Tags 數量:', specs.tags?.length);
console.log(
  'Components Schemas 數量:',
  Object.keys(specs.components?.schemas || {}).length
);

// 列出所有 tags
console.log('\n=== API Tags ===');
specs.tags?.forEach((tag) => {
  console.log(`- ${tag.name}: ${tag.description}`);
});

// 列出所有 schemas
console.log('\n=== Available Schemas ===');
if (specs.components?.schemas) {
  Object.keys(specs.components.schemas).forEach((schema) => {
    console.log(`- ${schema}`);
  });
}

console.log('\n✅ Swagger 配置檢查完成！');
console.log('🌐 API 文件將在 http://localhost:3001/api-docs 提供服務');
