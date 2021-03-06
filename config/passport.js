import config from 'config';
import passport from 'passport';
import passportLocal from 'passport-local';
import passportJWT from 'passport-jwt';
import usersServices from '../src/api/users/services/services';

const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.get('secretKey');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
},
  ((email, password, done) => {
    return usersServices.findByEmailAndPass(email, password)
      .then((user) => {
        if (!user) {
          return done(null, false, { message: 'Incorrect email or password.' });
        }

        return done(null, user, {
          message: 'Logged In Successfully',
        });
      })
      .catch((err) => {
        return done(err);
      });
  })));

passport.use('user-role', new JWTStrategy(
  opts,
  ((jwtPayload, done) => {
    return usersServices.findOne(jwtPayload.email)
      .then((user) => {
        if (!user) {
          return done(null, false);
        }

        return done(null, user);
      })
      .catch(err => done(err));
  }),
));

passport.use('admin-role', new JWTStrategy(
  opts,
  ((jwtPayload, done) => {
    return usersServices.findOne(jwtPayload.email)
      .then((user) => {
        if (!user) {
          return done(null, false);
        }

        if (user.role !== 'admin') {
          return done(null, false);
        }

        return done(null, user);
      })
      .catch(err => done(err));
  }),
));
