import { Router } from 'express';

import find from './middleware/find';

const router = Router();

router.get('users', find);

export default router;
