import { createUser, getUser } from './userService.js';

export default (app) => {
  app.post('/user', createUser);
  app.get('/user/:username', getUser);
};
