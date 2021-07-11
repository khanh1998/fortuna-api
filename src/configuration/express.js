import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import './mongoose.js';
import userController from '../user/userController.js';
import assetController from '../asset/assetController.js';
import transactionController from '../transaction/transactionController.js';
import assetGroupController from '../asset-group/assetGroupController.js';
import authController from '../auth/authController.js';
import initPassport from './passport.js';

export default () => {
  const app = express();
  app.use(helmet());
  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  const passport = initPassport();
  app.use(passport.initialize());
  userController(app, passport);
  assetController(app, passport);
  transactionController(app, passport);
  assetGroupController(app, passport);
  authController(app, passport);
  return app;
};
