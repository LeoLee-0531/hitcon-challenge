import { Router } from 'express';
import { ExpressAuth } from '@auth/express';
import Google from '@auth/express/providers/google';

const router: Router = Router();

router.use('/*', ExpressAuth({ providers: [Google] }));

export default router;
