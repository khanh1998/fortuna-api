import { createTransaction, getTransaction } from './transactionService.js';

export default (app) => {
  app.post('/transaction', createTransaction);
  app.get('/transaction', getTransaction);
};
