import { createUser, getUser, updateUser } from './userService.js';
import { getAuthentication } from '../utils/auth.js';

export default (app, passport) => {
  const authenticate = getAuthentication(passport);
  app.post('/user', createUser);
  app.get('/user', authenticate, getUser);
  app.put('/user', authenticate, updateUser);
};
