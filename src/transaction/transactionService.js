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
export const updateTransaction = async (req, res) => {
  const { transactionId } = req.params;
  const { description, amount, type } = req.body;
  try {
    const transaction = await TransactionModel.findById(transactionId);
    if (!transactionId) {
      throw new Error(`Transaction ${transactionId} is not existed`);
    }
    if (description) {
      transaction.description = description;
    }
    if (amount) {
      const currentAsset = await AssetModel.findById(transaction.asset);
      const { amount: oldAmount } = transaction;
      if (currentAsset.amount + amount - oldAmount >= 0) {
        transaction.amount = amount;
        currentAsset.amount += amount - oldAmount;
        currentAsset.save();
      } else {
        throw new Error(`Invalid amount of ${amount}`);
      }
    }
    if (type) {
      transaction.type = type;
    }
    const saved = await transaction.save();
    return res.status(200).json(saved);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
