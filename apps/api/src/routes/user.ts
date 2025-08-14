import { Router } from 'express';
import { getUserProfile, loginUser, getUserMe } from '../controllers/user';
import { authenticateUser } from '../middleware/auth';
import { validateBody } from '../middleware/validation';
import { userLoginSchema } from '../schemas/validation';

const router: Router = Router();

// 取得目前使用者基本資料
/**
 * @swagger
 * /api/user/me:
 *   get:
 *     summary: 取得目前使用者基本資料
 *     description: 回傳目前登入使用者的 id、email、role
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 成功取得使用者基本資料
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
 *                     id:
 *                       type: string
 *                       example: "user-id-123"
 *                     name:
 *                       type: string
 *                       example: "使用者名稱"
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: "user@example.com"
 *                     role:
 *                       type: string
 *                       example: "ADMIN"
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
router.get('/me', authenticateUser, getUserMe);

router.post('/login', validateBody(userLoginSchema), loginUser);

// TODO: 修改 swagger example
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
 *                           example: [{ stage_id: 688a0306075d3123e024b691, stage_title: "實體 Flag 蒐集", passed: false }]
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

export default router;
