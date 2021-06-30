import passport from 'passport';
import { Strategy } from 'passport-local';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import UserModel from '../user/user.js';

const jwtOptions = {
  secretOrKey: process.env.SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // || cookieExtractor(),
  issuer: process.env.HOST,
};
const localOptions = {
  usernameField: 'username',
  passwordField: 'password',
};
const initPassport = () => {
  passport.use(
    'jwt',
    new JwtStrategy(jwtOptions, async (payload, done) => {
      try {
        const { email } = payload;
        const user = await UserModel.findOne({ email });
        if (user) {
          return done(null, user);
        }
        return done(null, false, {
          success: false,
          message: 'unregister user',
        });
      } catch (error) {
        console.log(error);
        return done(error, false);
      }
    }),
  );
  passport.use(
    'local',
    new Strategy(localOptions, async (username, password, done) => {
      try {
        const user = await UserModel.findOne({ username });
        if (user) {
          const matchPassword = await user.comparePassword(password);
          if (matchPassword) {
            return done(null, user);
          }
          return done(null, false, {
            success: false,
            message: 'wrong password',
          });
        }
        return done(null, false, {
          success: false,
          message: 'Unregisterd user',
        });
      } catch (error) {
        return done(error, false);
      }
    }),
  );
  return passport;
};
export default initPassport;
