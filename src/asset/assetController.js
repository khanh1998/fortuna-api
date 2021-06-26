import { createAsset, getAllAssets } from './assetService.js';

export default (app, passport) => {
  app.post('/asset', createAsset);
  app.get('/asset', getAllAssets);
};
