import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import './mongoose.js';

export default () => {
  const app = express();
  app.use(helmet());
  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  return app;
};
