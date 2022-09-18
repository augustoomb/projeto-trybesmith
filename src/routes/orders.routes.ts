import { Router } from 'express';
import OrdersController from '../controllers/orders.controller';
import validationCreateOrder from '../middlewares/orders.middleware';
import validationAuth from '../middlewares/auth.middleware';

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.get('/orders', ordersController.getAll);
ordersRouter.post('/orders', validationAuth, validationCreateOrder, ordersController.create);

export default ordersRouter;