import express from 'express';
import * as userController from './controllers/user';
import logining from './controllers/login';
import authToken from './token/authToken';
import * as productController from './controllers/product';
import * as orderController from './controllers/order';

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

app.post(
  '/orders',
  authToken,
  orderController.verifyBodyOrder,
  orderController.saveOrder,
);

app.get(
  '/orders/:id',
  authToken,
  orderController.getOrder,
);

app.get(
  '/orders',
  authToken,
  orderController.getAll,
);

export default app;
