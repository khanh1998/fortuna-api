import { createTransaction, getTransaction } from './transactionService.js';

export default (app, passport) => {
  app.post('/transaction', createTransaction);
  app.get('/transaction', getTransaction);
};
