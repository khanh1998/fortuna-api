import { AssetModel } from './asset.js';

export const createAsset = async (req, res) => {
  try {
    const { name, code, description, unit } = req.body;
    const newAsset = new AssetModel({ name, code, description, unit });
    const saved = await newAsset.save();
    if (saved) {
      return res.status(200).json(saved);
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getAssetByUser = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await AssetModel.find({ username });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getAllAssets = async (req, res) => {
  try {
    const assets = await AssetModel.find({});
    return res.status(200).json(assets);
  } catch (error) {
    return res.status(400).json(error);
  }
};
