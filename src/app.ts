import express from 'express';
import * as userController from './controllers/user';
import logining from './controllers/login';

const app = express();

app.use(express.json());

app.post(
  '/users',
  userController.authName,
  userController.authClass,
  userController.authLevel,
  userController.authPassword,
  userController.createUser,
);

app.post(
  '/login',
  userController.authName,
  userController.authPassword,
  logining,
);

export default app;
