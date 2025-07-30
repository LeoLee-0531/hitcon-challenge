import { Router } from 'express';
import { getUserProfile, updateUserLanguage } from '../controllers/user';
import { authenticateUser } from '../middleware/auth';
import { validateBody } from '../middleware/validation';
import { userLanguageSchema } from '../schemas/validation';

const router: Router = Router();

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: 查詢使用者個人資料
 *     description: 取得當前使用者的個人資料，包含闖關狀態
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 成功取得使用者資料
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
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *                     progress:
 *                       type: object
 *                       properties:
 *                         completed_stages:
 *                           type: array
 *                           items:
 *                             type: string
 *                           example: ['stage-1', 'stage-2']
 *                         total_stages:
 *                           type: integer
 *                           example: 5
 *                         completion_rate:
 *                           type: number
 *                           example: 0.4
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       401:
 *         description: 未授權或 token 無效
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/profile', authenticateUser, getUserProfile);

/**
 * @swagger
 * /api/user/language:
 *   post:
 *     summary: 更新使用者語言設定
 *     description: 切換使用者介面語言（中文/英文）
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - language
 *             properties:
 *               language:
 *                 type: string
 *                 enum: ['zh', 'en']
 *                 description: 語言代碼
 *                 example: 'zh'
 *     responses:
 *       200:
 *         description: 語言設定更新成功
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
 *                     language:
 *                       type: string
 *                       example: 'zh'
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
 *         description: 未授權或 token 無效
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post(
  '/language',
  authenticateUser,
  validateBody(userLanguageSchema),
  updateUserLanguage
);

export default router;
