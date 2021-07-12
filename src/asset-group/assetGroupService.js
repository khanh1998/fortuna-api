import { AssetGroupModel } from './assetGroup.js';
import { getAssetByUserService } from '../asset/assetService.js';

export const createGroup = async (req, res) => {
  try {
    const { id } = req.user;
    const { name } = req.body;
    const newAssetGroup = new AssetGroupModel({ name, user: id });
    const saved = await newAssetGroup.save();
    return res.status(200).json(saved.toJSON({ virtuals: true }));
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getGroupsByUser = async (req, res) => {
  try {
    const { id } = req.user;

    const groups = await AssetGroupModel.find({ user: id });
    return res
      .status(200)
      .json(groups.map((item) => item.toJSON({ virtuals: true })));
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const updateGroup = async (req, res) => {
  try {
    const { assetGroupId } = req.params;
    const { name } = req.body;
    const assetGroup = await AssetGroupModel.findById(assetGroupId);
    assetGroup.name = name;
    const saved = await assetGroup.save();
    return res.status(200).json(saved.toJSON({ virtuals: true }));
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const deleteGroup = async (req, res) => {
  try {
    const { id } = req.user;
    const { assetGroupId } = req.params;
    const assets = await getAssetByUserService({
      user: id,
      group: assetGroupId,
    });
    if (assets.length === 0) {
      await AssetGroupModel.findByIdAndDelete(assetGroupId);
      return res
        .status(200)
        .json(assetGroupId);
    }
    return res.status(400).json({
      success: false,
      message: `Asset Group Id ${assetGroupId} is not valid`,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
