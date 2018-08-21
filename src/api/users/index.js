import { Router } from 'express';

import find from './middleware/find';
import findOne from './middleware/findOne';
import createOne from './middleware/createOne';
import updateOne from './middleware/updateOne';
import deleteOne from './middleware/deleteOne';

const router = Router();

// Users
router.get('/users', find);

// User
router.post('/users', createOne);
router.get('/users/:email', findOne);
router.patch('/users/:email', updateOne);
router.delete('/users/:email', deleteOne);

export default router;
