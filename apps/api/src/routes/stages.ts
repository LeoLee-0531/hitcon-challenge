import { Router } from 'express';
import { getAllStages, verifyStagePassword } from '../controllers/stages';
import { authenticateUser } from '../middleware/auth';
import { validateBody } from '../middleware/validation';
import { stageVerifySchema } from '../schemas/validation';

const router: Router = Router();

/**
 * @swagger
 * /api/stages:
 *   get:
 *     summary: 查詢所有關卡資訊
 *     description: 取得所有可用的關卡列表和基本資訊
 *     tags: [Stages]
 *     responses:
 *       200:
 *         description: 成功取得關卡列表
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
 *                     stages:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Stage'
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       500:
 *         description: 伺服器錯誤
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', getAllStages);

/**
 * @swagger
 * /api/stages/verify:
 *   post:
 *     summary: 闖關密碼驗證
 *     description: 驗證使用者提交的關卡密碼是否正確
 *     tags: [Stages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - stage_id
 *               - password
 *             properties:
 *               stage_id:
 *                 type: string
 *                 description: 關卡 ID
 *                 example: 'stage-1'
 *               password:
 *                 type: string
 *                 description: 關卡密碼
 *                 example: 'correct_password'
 *     responses:
 *       200:
 *         description: 密碼驗證成功
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
 *                     stage_id:
 *                       type: string
 *                       example: 'stage-1'
 *                     completed:
 *                       type: boolean
 *                       example: true
 *                     completed_at:
 *                       type: string
 *                       format: date-time
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: 請求參數錯誤或密碼錯誤
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
 *       404:
 *         description: 關卡不存在
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post(
  '/verify',
  authenticateUser,
  validateBody(stageVerifySchema),
  verifyStagePassword
);

export default router;
