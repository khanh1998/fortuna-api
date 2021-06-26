import { createTransaction, getTransaction } from './transactionService.js';
import { getAuthentication } from '../utils/auth.js';

export default (app, passport) => {
  const authenticate = getAuthentication(passport);
  app.post('/transaction', authenticate, createTransaction);
  app.get('/transaction', authenticate, getTransaction);
};
