import { Router } from 'express';
import { getRewardStatus } from '../controllers/reward';
import { authenticateUserOrAdmin } from '../middleware/auth';

const router: Router = Router();

/**
 * @swagger
 * /api/reward/status:
 *   get:
 *     summary: 查詢獎勵狀態
 *     description: 查詢使用者的獎勵領取狀態（使用者或管理員皆可查詢）
 *     tags: [Rewards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: string
 *         description: 查詢特定使用者 ID（管理員限定）
 *         example: 'user-123'
 *     responses:
 *       200:
 *         description: 成功取得獎勵狀態
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
 *                     rewards:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           claimed:
 *                             type: boolean
 *                           claimed_at:
 *                             type: string
 *                             format: date-time
 *                     completion_status:
 *                       type: object
 *                       properties:
 *                         completed_stages:
 *                           type: integer
 *                         total_stages:
 *                           type: integer
 *                         eligible_for_reward:
 *                           type: boolean
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       401:
 *         description: 未授權或 token 無效
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
router.get('/status', authenticateUserOrAdmin, getRewardStatus);

export default router;
