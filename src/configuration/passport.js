import passport from 'passport';
import { Strategy } from 'passport-local';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import UserModel from '../user/user.js';
import FacebookConfig from './facebook.js';

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
        return done(null, false);
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
  passport.use(
    'facebook',
    new FacebookStrategy(
      {
        clientID: FacebookConfig.facebook_id,
        clientSecret: FacebookConfig.facebook_secret,
        callbackURL: FacebookConfig.callback_url,
        profileFields: ['email', 'gender', 'photos', 'displayName'],
      },
      async (accessToken, refreshToken, profile, done) => {
        const { email, name, id, picture } = profile._json;
        console.log(profile);
        const userData = {
          email,
          name,
          password: 'eeeee',
          username: `facebook${id}`,
          avatar: picture ? picture.data.url : '',
        };
        const user = await UserModel.findOne({ username: `facebook${id}` });
        if (user) {
          user.name = name;
          if (picture) {
            user.avatar = picture.data.url;
          }
          await user.save();
          done(null, user);
        } else {
          const newUser = new UserModel(userData);
          const saved = await newUser.save();
          done(null, saved);
        }
      },
    ),
  );
  return passport;
};
export default initPassport;
