import { Router } from 'express';
import { claimReward, resetReward } from '../controllers/reward';
import {
  getOverviewStatistics,
  getStageStatistics,
  getRewardStatistics,
} from '../controllers/statistics';
import { authenticateAdmin } from '../middleware/auth';
import { validateBody } from '../middleware/validation';
import { rewardClaimSchema } from '../schemas/validation';

const router: Router = Router();

/**
 * @swagger
 * /api/admin/reward/claim:
 *   post:
 *     summary: 管理員標記獎勵已領取
 *     description: 管理員使用此 API 標記特定使用者的獎勵為已領取狀態
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: 使用者 ID
 *                 example: 'user-123'
 *     responses:
 *       200:
 *         description: 獎勵領取狀態更新成功
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
 *                     user_id:
 *                       type: string
 *                       example: 'user-123'
 *                     claimed:
 *                       type: boolean
 *                       example: true
 *                     claimed_at:
 *                       type: string
 *                       format: date-time
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
 *         description: 未授權或管理員 token 無效
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: 使用者不存在
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post(
  '/reward/claim',
  authenticateAdmin,
  validateBody(rewardClaimSchema),
  claimReward
);

/**
 * @swagger
 * /api/admin/reward/reset:
 *   post:
 *     summary: 管理員重置獎勵狀態
 *     description: 管理員使用此 API 重置特定使用者的獎勵領取狀態
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: 使用者 ID
 *                 example: 'user-123'
 *     responses:
 *       200:
 *         description: 獎勵狀態重置成功
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
 *                     user_id:
 *                       type: string
 *                       example: 'user-123'
 *                     claimed:
 *                       type: boolean
 *                       example: false
 *                     reset_at:
 *                       type: string
 *                       format: date-time
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
 *         description: 未授權或管理員 token 無效
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: 使用者不存在
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post(
  '/reward/reset',
  authenticateAdmin,
  validateBody(rewardClaimSchema),
  resetReward
);

/**
 * @swagger
 * /api/admin/statistics/overview:
 *   get:
 *     summary: 取得總覽統計資料
 *     description: 管理員查看系統總覽統計，包含使用者數量、完成率等資訊
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 成功取得總覽統計
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
 *                     total_users:
 *                       type: integer
 *                       example: 150
 *                     total_stages:
 *                       type: integer
 *                       example: 5
 *                     completed_users:
 *                       type: integer
 *                       example: 45
 *                     completion_rate:
 *                       type: number
 *                       example: 0.3
 *                     rewards_claimed:
 *                       type: integer
 *                       example: 30
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       401:
 *         description: 未授權或管理員 token 無效
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/statistics/overview', authenticateAdmin, getOverviewStatistics);

/**
 * @swagger
 * /api/admin/statistics/stages:
 *   get:
 *     summary: 取得關卡統計資料
 *     description: 管理員查看各關卡的完成統計資訊
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 成功取得關卡統計
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
 *                         type: object
 *                         properties:
 *                           stage_id:
 *                             type: string
 *                             example: 'stage-1'
 *                           title:
 *                             type: string
 *                             example: '第一關'
 *                           completed_count:
 *                             type: integer
 *                             example: 120
 *                           completion_rate:
 *                             type: number
 *                             example: 0.8
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       401:
 *         description: 未授權或管理員 token 無效
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/statistics/stages', authenticateAdmin, getStageStatistics);

/**
 * @swagger
 * /api/admin/statistics/rewards:
 *   get:
 *     summary: 取得獎勵統計資料
 *     description: 管理員查看獎勵領取的統計資訊
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 成功取得獎勵統計
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
 *                     total_eligible:
 *                       type: integer
 *                       example: 45
 *                       description: 符合獎勵資格的使用者數量
 *                     total_claimed:
 *                       type: integer
 *                       example: 30
 *                       description: 已領取獎勵的使用者數量
 *                     claim_rate:
 *                       type: number
 *                       example: 0.67
 *                       description: 獎勵領取率
 *                     unclaimed_users:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           user_id:
 *                             type: string
 *                           email:
 *                             type: string
 *                           completed_at:
 *                             type: string
 *                             format: date-time
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       401:
 *         description: 未授權或管理員 token 無效
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/statistics/rewards', authenticateAdmin, getRewardStatistics);

export default router;
