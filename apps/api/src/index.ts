import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import { config } from 'dotenv';
import { specs } from './config/swagger';

// 載入環境變數
config();

// 導入路由
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import stageRoutes from './routes/stages'; // 修正為 stages.ts
import rewardRoutes from './routes/reward';
import adminRoutes from './routes/admin';

const app = express();
const PORT = process.env.PORT || 3001;

// 中間件設定
app.use(helmet());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || [
      'http://localhost:3000',
    ],
    credentials: true,
  })
);

// 速率限制
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 分鐘
  max: 100, // 限制每個 IP 100 個請求
  message: {
    success: false,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: '請求過於頻繁，請稍後再試',
      timestamp: new Date().toISOString(),
    },
  },
});

app.use(limiter);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Swagger API 文件 - 生產環境禁用
if (process.env.NODE_ENV !== 'production') {
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(specs, {
      customSiteTitle: 'HITCON Challenge API Documentation',
      customCss: '.swagger-ui .topbar { display: none }',
      customCssUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
    })
  );
}

// 健康檢查
/**
 * @swagger
 * /:
 *   get:
 *     summary: API 根路徑
 *     description: 檢查 API 是否正常運行
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API 正常運行
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: 'HITCON Challenge API is running!'
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 */
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'HITCON Challenge API is running!',
    timestamp: new Date().toISOString(),
  });
});

/**
 * @swagger
 * /health:
 *   get:
 *     summary: 健康檢查
 *     description: 檢查服務器健康狀態
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: 服務器健康
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 status:
 *                   type: string
 *                   example: 'healthy'
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 */
app.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
  });
});

// API 路由
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/stages', stageRoutes);
app.use('/api/reward', rewardRoutes);
app.use('/api/admin', adminRoutes);

// 404 處理
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `路由 ${req.originalUrl} 不存在`,
      timestamp: new Date().toISOString(),
    },
  });
});

// 錯誤處理中間件
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error('未處理的錯誤:', err);

    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: '伺服器內部錯誤',
        timestamp: new Date().toISOString(),
      },
    });
  }
);

app.listen(PORT, () => {
  console.log(`🚀 API 服務器運行在 http://localhost:${PORT}`);
  console.log(`🔧 環境: ${process.env.NODE_ENV || 'development'}`);
});
