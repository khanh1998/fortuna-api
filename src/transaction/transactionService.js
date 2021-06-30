import { TransactionModel } from './transaction.js';
import UserModel from '../user/user.js';

export const createTransaction = async (req, res) => {
  try {
    const userData = await UserModel.findOne({ email: req.user.email })
      .populate('assets')
      .populate('lastestTransactions');
    console.log({ userData });
    const { lastestTransactions, id: userId } = userData;
    const { description, asset, amount } = req.body;
    // finding previous transaction which belong to the same asset type
    const prevTrans = lastestTransactions
      ? lastestTransactions.find((item) => `${item.asset}` === `${asset}`)
      : null;
    console.log({ prevTrans });
    let payload = {
      description,
      asset,
      amount,
      user: userId,
    };
    if (prevTrans) {
      const { id: prevId, total } = prevTrans;
      payload = {
        ...payload,
        prev: prevId,
        total: total + amount,
      };
    } else {
      payload = {
        ...payload,
        total: amount,
      };
    }
    console.log({ payload });
    const newTransaction = new TransactionModel(payload);
    const saved = await newTransaction.save();
    const transaction = await TransactionModel.findById(saved.id)
      .populate('user')
      .populate('asset')
      .populate('prev');
    if (prevTrans) {
      userData.lastestTransactions.pull(prevTrans.id);
      userData.lastestTransactions.push(saved.id);
      const userAsset = userData.assets.find((item) => `${item.id}` === `${asset}`);
      userAsset.amount += amount;
      await userData.save();
    } else {
      userData.lastestTransactions.push(saved.id);
      await userData.save();
    }
    return res.status(200).json(transaction.toJSON({ virtuals: true }));
  } catch (error) {
    return res.status(400).json(error);
  }
};
export const getTransaction = async (req, res) => {
  const { asset } = req.query;
  const user = req.user.id;
  try {
    const transactions = await TransactionModel.find({ user, asset })
      .populate('asset')
      .populate('prev');
    return res
      .status(200)
      .json(transactions.map((item) => item.toJSON({ virtuals: true })));
  } catch (error) {
    return res.status(400).json(error);
  }
};
