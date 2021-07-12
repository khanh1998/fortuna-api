import { TransactionModel } from './transaction.js';
import { AssetModel } from '../asset/asset.js';

export const createTransaction = async (req, res) => {
  try {
    const { id } = req.user;
    const { description, asset, amount, type } = req.body;
    const assetDoc = await AssetModel.findById(asset);
    if (!assetDoc) {
      throw new Error(`Asset ${asset} is not existed`);
    }
    if (assetDoc.amount + amount < 0) {
      throw new Error(`Amount ${amount} is exceed in stock ${assetDoc.amount}`);
    }
    const payload = {
      description,
      asset,
      amount,
      user: id,
      type,
    };
    const newTransaction = new TransactionModel(payload);
    const saved = await newTransaction.save();
    // update amount in asset
    assetDoc.amount += amount;
    await assetDoc.save();
    const transaction = await TransactionModel.findById(saved.id);
    return res.status(200).json(transaction.toJSON({ virtuals: true }));
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
export const getTransaction = async (req, res) => {
  const { asset } = req.query;
  const user = req.user.id;
  try {
    const transactions = await TransactionModel.find({ user, asset });
    return res
      .status(200)
      .json(transactions.map((item) => item.toJSON({ virtuals: true })));
  } catch (error) {
    return res.status(400).json(error);
  }
};
