import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import './mongoose.js';
import userController from '../user/userController.js';

export default () => {
  const app = express();
  app.use(helmet());
  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  userController(app);
  return app;
};
