import jwt from 'jsonwebtoken';
import { firebase } from '../configuration/firebase.js';

async function generateJwt(user) {
  const { name, email, uid } = user;
  const options = {
    expiresIn: '1d',
    issuer: process.env.HOST,
  };
  const token = jwt.sign({ name, email, uid }, process.env.SECRET, options);
  return token;
}

export default (app, passport) => {
  app.post('/auth/jwt', (req, res, next) => {
    passport.authenticate(
      'local',
      { session: false },
      async (error, user, info) => {
        console.log(info);
        if (error) {
          res.status(500).json({
            success: false,
            message: error.message,
          });
        }
        const expiresTime = 1 * 24 * 60 * 60;
        if (user) {
          const { _id, username, email } = user;
          const payload = {
            id: _id,
            username,
            email,
          };
          const options = {
            expiresIn: '1d',
            issuer: process.env.HOST,
          };
          try {
            const jsonwebtoken = await jwt.sign(
              payload,
              process.env.SECRET,
              options,
            );
            res.status(200).json({
              jwt: jsonwebtoken,
            });
          } catch (errorJwt) {
            res.status(500).json({
              success: false,
              message: errorJwt.message,
            });
          }
        } else {
          res.status(401).json({
            success: false,
            message: 'Unregister user!',
          });
        }
      },
    )(req, res, next);
  });
  app.get(
    '/auth/facebook',
    passport.authenticate('facebook', { scope: ['email'] }),
  );
  app.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', {
      session: false,
    }),
    (req, res) => {
      // const token = req.user.jwtoken;
      // res.cookie('jwt', token);
      // res.redirect('http://localhost:3000');
      res.send({ message: 'hello' });
    },
  );
  app.post('/auth/firebase/facebook', async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    const fail = {
      success: false,
      message: 'no jwt, no login',
    };
    if (token == null) return res.status(401).json(fail);
    try {
      const decoded = await firebase.auth().verifyIdToken(token);
      if (decoded) {
        const newJwt = await generateJwt(decoded);
        return res.status(200).json({
          success: true,
          message: newJwt,
        });
      }
      return res.status(401).json({
        success: false,
        message: 'token id is expired, get a new one',
      });
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: error,
      });
    }
  });
};
