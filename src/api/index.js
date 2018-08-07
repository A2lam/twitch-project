import { Router } from 'express';
import userRooter from './users';

const router = Router();

router.use(userRooter);

export default router;
