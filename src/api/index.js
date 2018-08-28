import { Router } from 'express';
import authRouter from './auth/auth';
import userRooter from './users';
import twitchRooter from './twitch';

const router = Router();

router.use(authRouter);
router.use(userRooter);
router.use(twitchRooter);

export default router;
