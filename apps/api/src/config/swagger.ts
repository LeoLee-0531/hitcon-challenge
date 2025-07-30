import swaggerJsdoc from 'swagger-jsdoc';
import { NODE_ENV } from './env';

// 根據環境動態配置 Swagger
const getSwaggerConfig = () => {
  const isProduction = NODE_ENV === 'production';

  // 生產環境完全關閉 Swagger
  if (isProduction) {
    return null;
  }

  // 開發環境的完整配置
  const developmentConfig: swaggerJsdoc.Options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'HITCON Challenge API',
        version: '1.0.0',
        description: 'HITCON 挑戰賽後端 API 文件',
        contact: {
          name: 'API Support',
          email: 'support@hitcon.org',
        },
      },
      servers: [
        {
          url: 'http://localhost:3001',
          description: '開發環境',
        },
        {
          url: 'https://api.hitcon-challenge.com',
          description: '生產環境',
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
        headers: {
          'X-RateLimit-Limit': {
            description: '每個時間窗口允許的最大請求數',
            schema: {
              type: 'integer',
              example: 100,
            },
          },
          'X-RateLimit-Remaining': {
            description: '當前時間窗口剩餘的請求數',
            schema: {
              type: 'integer',
              example: 95,
            },
          },
          'X-RateLimit-Reset': {
            description: '下次重置的時間戳',
            schema: {
              type: 'string',
              example: '2023-12-01T10:15:00.000Z',
            },
          },
          'Access-Control-Allow-Origin': {
            description: 'CORS - 允許的來源',
            schema: {
              type: 'string',
              example: 'http://localhost:3000',
            },
          },
          'Access-Control-Allow-Credentials': {
            description: 'CORS - 是否允許憑證',
            schema: {
              type: 'string',
              example: 'true',
            },
          },
          'Content-Security-Policy': {
            description: '內容安全政策',
            schema: {
              type: 'string',
              example: "default-src 'self'",
            },
          },
          'X-Content-Type-Options': {
            description: '防止 MIME 類型嗅探',
            schema: {
              type: 'string',
              example: 'nosniff',
            },
          },
          'X-Frame-Options': {
            description: '防止點擊劫持',
            schema: {
              type: 'string',
              example: 'SAMEORIGIN',
            },
          },
        },
        schemas: {
          Error: {
            type: 'object',
            properties: {
              success: {
                type: 'boolean',
                example: false,
              },
              error: {
                type: 'object',
                properties: {
                  code: {
                    type: 'string',
                    example: 'INVALID_REQUEST',
                  },
                  message: {
                    type: 'string',
                    example: '錯誤訊息',
                  },
                  timestamp: {
                    type: 'string',
                    format: 'date-time',
                    example: '2023-12-01T10:00:00.000Z',
                  },
                },
              },
            },
          },
          SuccessResponse: {
            type: 'object',
            properties: {
              success: {
                type: 'boolean',
                example: true,
              },
              data: {
                type: 'object',
              },
              timestamp: {
                type: 'string',
                format: 'date-time',
                example: '2023-12-01T10:00:00.000Z',
              },
            },
          },
          User: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                example: 'user-123',
              },
              email: {
                type: 'string',
                format: 'email',
                example: 'user@example.com',
              },
              name: {
                type: 'string',
                example: '使用者名稱',
              },
              language: {
                type: 'string',
                enum: ['zh', 'en'],
                example: 'zh',
              },
              createdAt: {
                type: 'string',
                format: 'date-time',
                example: '2023-12-01T10:00:00.000Z',
              },
            },
          },
          Stage: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                example: 'stage-1',
              },
              title: {
                type: 'string',
                example: '第一關',
              },
              description: {
                type: 'string',
                example: '關卡描述',
              },
              difficulty: {
                type: 'string',
                enum: ['easy', 'medium', 'hard'],
                example: 'easy',
              },
              order: {
                type: 'integer',
                example: 1,
              },
            },
          },
          Reward: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                example: 'reward-1',
              },
              title: {
                type: 'string',
                example: '獎勵標題',
              },
              description: {
                type: 'string',
                example: '獎勵描述',
              },
              type: {
                type: 'string',
                example: 'badge',
              },
            },
          },
        },
      },
      tags: [
        {
          name: 'Authentication',
          description: '身份驗證相關 API',
        },
        {
          name: 'User',
          description: '使用者相關 API',
        },
        {
          name: 'Stages',
          description: '關卡相關 API',
        },
        {
          name: 'Rewards',
          description: '獎勵相關 API',
        },
        {
          name: 'Admin',
          description: '管理員相關 API',
        },
        {
          name: 'Health',
          description: '健康檢查 API',
        },
      ],
    },
    apis: ['./src/routes/*.ts', './src/controllers/*.ts', './src/index.ts'],
  };

  return developmentConfig;
};

const swaggerConfig = getSwaggerConfig();
export const specs = swaggerConfig ? swaggerJsdoc(swaggerConfig) : null;
