import { Router } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

const router = Router();

// Authentication
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    console.log(err);
    if (err || !user) {
      return res.status(400).json({
        message: 'Something went wrong',
        user,
      });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        next(err);
      }

      // Generation of the token using user info
      const token = jwt.sign(user, 'my_super_secret_key');
      return res.json({ user, token });
    });
  })(req, res, next);
});

export default router;
