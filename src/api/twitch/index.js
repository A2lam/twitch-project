import passport from 'passport';
import { Router } from 'express';

import search from './middleware/search';
import addFav from './middleware/addFav';

const router = Router();

router.get('/search', passport.authenticate('user-role', { session: false }), search);
router.post('/favorites/:game_id', passport.authenticate('user-role', { session: false }), addFav);

export default router;
