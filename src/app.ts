import express from 'express';
import * as userController from './controllers/user';
import logining from './controllers/login';
import authToken from './token/authToken';
import * as productController from './controllers/product';

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

app.post(
  '/products',
  authToken,
  productController.authName,
  productController.authAmount,
  productController.createProduct,
);

app.get(
  '/products',
  authToken,
  productController.getAll,
);

export default app;
