import { Router, type Router as ExpressRouter } from 'express';
import { getAllStages, verifyStagePassword } from '../controllers/stages';
import { authenticateUser } from '../middleware/auth';
import { validateBody } from '../middleware/validation';
import { stageVerifySchema } from '../schemas/validation';

const router: ExpressRouter = Router();

// 查詢所有關卡資訊
router.get('/', getAllStages);

// 闖關密碼驗證
router.post(
  '/verify',
  authenticateUser,
  validateBody(stageVerifySchema),
  verifyStagePassword
);

export default router;
