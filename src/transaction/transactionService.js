import { TransactionModel } from './transaction.js';

export const createTransaction = async (req, res) => {
  try {
    const newTransaction = new TransactionModel(req.body);
    const saved = await newTransaction.save();
    console.log(saved);
    return res.status(200).json(saved.toJSON({ virtuals: true }));
  } catch (error) {
    return res.status(400).json(error);
  }
};
export const getTransaction = async (req, res) => {
  try {
    const transactions = await TransactionModel.find({}).populate('user').populate('asset').populate('prev');
    return res.status(200).json(transactions.map((item) => item.toJSON({ virtuals: true })));
  } catch (error) {
    return res.status(400).json(error);
  }
};
