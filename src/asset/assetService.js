import { AssetModel } from './asset.js';

export const createAsset = async (req, res) => {
  try {
    const { id } = req.user;
    const { name, code, description, unit, group } = req.body;
    const newAsset = new AssetModel({
      name,
      code,
      description,
      unit,
      user: id,
      group,
    });
    const saved = await newAsset.save();
    const asset = await AssetModel.findById(saved._id);
    if (saved) {
      return res.status(200).json(asset.toJSON({ virtuals: true }));
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const getAssetByUserService = async (query) => {
  const assets = await AssetModel.find(query);
  return assets;
};

export const getAssetByUser = async (req, res) => {
  const { id } = req.user;
  const { assetGroupId } = req.query;
  console.log(id, assetGroupId);
  try {
    const query = { user: id };
    if (assetGroupId) {
      query.group = assetGroupId;
    }
    const assets = await getAssetByUserService(query);
    return res
      .status(200)
      .json(assets.map((item) => item.toJSON({ virtuals: true })));
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getAllAssets = async (req, res) => {
  try {
    const assets = await AssetModel.find({});
    return res
      .status(200)
      .json(assets.map((item) => item.toJSON({ virtuals: true })));
  } catch (error) {
    return res.status(400).json(error);
  }
};

const updateObject = (obj, params) =>
  Object.entries(params).reduce((acc, curr) => {
    const [key, value] = curr;
    if (value) {
      acc[key] = value;
    }
    return acc;
  }, obj);

export const updateAsset = async (req, res) => {
  try {
    const { assetId } = req.params;
    const { name, description, group, unit, code } = req.body;
    let asset = await AssetModel.findById(assetId);
    asset = updateObject(asset, { name, description, group, unit, code });
    const saved = await asset.save();
    return res.status(200).json(saved.toJSON({ virtuals: true }));
  } catch (error) {
    return res.status(500).json(error);
  }
};
