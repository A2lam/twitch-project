import { Router } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import config from 'config';

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
      const token = jwt.sign(user, config.get('secretKey'), {
        expiresIn: 604800,
      });
      return res.json({ user, token });
    });
  })(req, res, next);
});

export default router;
