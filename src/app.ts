import express from 'express';
import * as userController from './controllers/user';

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

export default app;
