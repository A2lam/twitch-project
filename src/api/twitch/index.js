import passport from 'passport';
import { Router } from 'express';

import search from './middleware/search';
import find from './middleware/find';
import addFav from './middleware/addFav';
import findOneGame from './middleware/findOneGame';

const router = Router();

router.get('/search', passport.authenticate('user-role', { session: false }), search);
router.get('/favorites', passport.authenticate('user-role', { session: false }), find);
router.post('/favorites/:game_id', passport.authenticate('user-role', { session: false }), addFav);
router.get('/favorites/:game_id', passport.authenticate('user-role', { session: false }), findOneGame);

export default router;
