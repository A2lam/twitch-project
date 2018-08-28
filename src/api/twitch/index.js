import passport from 'passport';
import { Router } from 'express';

import search from './middleware/search';

const router = Router();

router.get('/search', passport.authenticate('user-role', { session: false }), search);

export default router;
