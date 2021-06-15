import { createUser, getUser, updateUser } from './userService.js';

export default (app) => {
  app.post('/user', createUser);
  app.get('/user/:username', getUser);
  app.put('/user/:username', updateUser);
};
