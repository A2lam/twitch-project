import passport from 'passport';
import { Router } from 'express';

import find from './middleware/find';
import findOne from './middleware/findOne';
import createOne from './middleware/createOne';
import updateOne from './middleware/updateOne';
import deleteOne from './middleware/deleteOne';

const router = Router();

// Users
router.get('/users', passport.authenticate('admin-role', { session: false }), find);

// User
router.post('/users', createOne);
router.get('/users/:email', passport.authenticate('user-role', { session: false }), findOne);
router.patch('/users/:email', passport.authenticate('user-role', { session: false }), updateOne);
router.delete('/users/:email', passport.authenticate('admin-role', { session: false }), deleteOne);

export default router;
