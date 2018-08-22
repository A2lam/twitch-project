import { Router } from 'express';
import userRooter from './users';
import authRouter from './auth/auth';

const router = Router();

router.use(userRooter);
router.use(authRouter);

export default router;
