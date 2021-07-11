import {
  createGroup,
  getGroupsByUser,
  deleteGroup,
  updateGroup,
} from './assetGroupService.js';
import { getAuthentication } from '../utils/auth.js';

export default (app, passport) => {
  const authenticate = getAuthentication(passport);
  app.post('/asset-group', authenticate, createGroup);
  app.get('/asset-group', authenticate, getGroupsByUser);
  app.put('/asset-group/:assetGroupId', authenticate, updateGroup);
  app.delete('/asset-group/:assetGroupId', authenticate, deleteGroup);
};
