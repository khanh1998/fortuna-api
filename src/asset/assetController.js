import { createAsset, getAssetByUser, updateAsset } from './assetService.js';
import { getAuthentication } from '../utils/auth.js';

export default (app, passport) => {
  const authenticate = getAuthentication(passport);
  app.post('/asset', authenticate, createAsset);
  app.get('/asset', authenticate, getAssetByUser);
  app.put('/asset/:assetId', authenticate, updateAsset);
};
