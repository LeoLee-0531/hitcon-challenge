import { Router, Request, Response, NextFunction } from 'express';
import { generateUserQRCode, getRewardStatus } from '../controllers/reward';
import { authenticateUser, authenticateAdmin } from '../middleware/auth';
import { AuthenticatedRequest } from '../types';

const router: Router = Router();

/**
 * @swagger
 * /api/reward/qrcode:
 *   post:
 *     summary: 生成使用者個人 QR Code
 *     description: 為已完成挑戰的使用者生成領獎用的 QR Code
 *     tags: [Rewards]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: QR Code 生成成功
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
 *                     qr_code:
 *                       type: string
 *                       description: Base64 編碼的 QR Code 圖片
 *                       example: 'data:image/png;base64,iVBOR...'
 *                     user_id:
 *                       type: string
 *                       example: 'user-123'
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       401:
 *         description: 未授權或 token 無效
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: 使用者尚未完成所有挑戰
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/qrcode', authenticateUser, generateUserQRCode);

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
router.get(
  '/status',
  (req: Request, res: Response, next: NextFunction) => {
    // 嘗試用戶驗證，如果失敗則嘗試管理員驗證
    authenticateUser(req as AuthenticatedRequest, res, (userErr) => {
      if (userErr) {
        authenticateAdmin(req as AuthenticatedRequest, res, next);
      } else {
        next();
      }
    });
  },
  getRewardStatus
);

export default router;
