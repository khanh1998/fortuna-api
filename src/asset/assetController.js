import { createAsset, getAllAssets } from './assetService.js';

export default (app) => {
  app.post('/asset', createAsset);
  app.get('/asset', getAllAssets);
};
