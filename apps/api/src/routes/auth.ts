import { Router } from 'express';
import {
  googleAuth,
  googleOAuthCallback,
  adminLogin,
} from '../controllers/auth';
import { validateBody } from '../middleware/validation';
import {
  googleAuthSchema,
  googleCodeSchema,
  adminLoginSchema,
} from '../schemas/validation';

const router: Router = Router();

/**
 * @swagger
 * /api/auth/google:
 *   post:
 *     summary: Google OAuth 登入
 *     description: 使用 Google OAuth token 進行使用者登入
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - google_token
 *             properties:
 *               google_token:
 *                 type: string
 *                 description: Google OAuth access token
 *                 example: 'ya29.a0AfH6SMC...'
 *     responses:
 *       200:
 *         description: 登入成功
 *         headers:
 *           Access-Control-Allow-Origin:
 *             $ref: '#/components/headers/Access-Control-Allow-Origin'
 *           Access-Control-Allow-Credentials:
 *             $ref: '#/components/headers/Access-Control-Allow-Credentials'
 *           X-RateLimit-Limit:
 *             $ref: '#/components/headers/X-RateLimit-Limit'
 *           X-RateLimit-Remaining:
 *             $ref: '#/components/headers/X-RateLimit-Remaining'
 *           X-Content-Type-Options:
 *             $ref: '#/components/headers/X-Content-Type-Options'
 *           X-Frame-Options:
 *             $ref: '#/components/headers/X-Frame-Options'
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       description: JWT token
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: 請求參數錯誤
 *         headers:
 *           X-RateLimit-Limit:
 *             $ref: '#/components/headers/X-RateLimit-Limit'
 *           X-RateLimit-Remaining:
 *             $ref: '#/components/headers/X-RateLimit-Remaining'
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Google token 無效
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       429:
 *         description: 請求過於頻繁
 *         headers:
 *           X-RateLimit-Limit:
 *             $ref: '#/components/headers/X-RateLimit-Limit'
 *           X-RateLimit-Remaining:
 *             $ref: '#/components/headers/X-RateLimit-Remaining'
 *           X-RateLimit-Reset:
 *             $ref: '#/components/headers/X-RateLimit-Reset'
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: string
 *                       example: 'RATE_LIMIT_EXCEEDED'
 *                     message:
 *                       type: string
 *                       example: '請求過於頻繁，請稍後再試'
 *                     timestamp:
 *                       type: string
 *                       format: date-time
 */
router.post('/google', validateBody(googleAuthSchema), googleAuth);

/**
 * @swagger
 * /api/auth/google/callback:
 *   post:
 *     summary: Google OAuth 回調處理
 *     description: 處理 Google OAuth 授權碼並完成登入
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *             properties:
 *               code:
 *                 type: string
 *                 description: Google OAuth 授權碼
 *                 example: '4/0AbcdEfg...'
 *     responses:
 *       200:
 *         description: 登入成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     user_token:
 *                       type: string
 *                       description: JWT token
 *                     user_id:
 *                       type: string
 *                       description: User ID
 *                     nickname:
 *                       type: string
 *                       description: User nickname
 *                     email:
 *                       type: string
 *                       description: User email
 *                     language:
 *                       type: string
 *                       description: User language preference
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: 請求參數錯誤
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Google 認證失敗
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post(
  '/google/callback',
  validateBody(googleCodeSchema),
  googleOAuthCallback
);

/**
 * @swagger
 * /api/auth/admin/login:
 *   post:
 *     summary: 管理員登入
 *     description: 使用密碼進行管理員登入
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 description: 管理員密碼
 *                 example: 'admin_password'
 *     responses:
 *       200:
 *         description: 登入成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       description: JWT token
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: 請求參數錯誤
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: 密碼錯誤
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/admin/login', validateBody(adminLoginSchema), adminLogin);

export default router;
