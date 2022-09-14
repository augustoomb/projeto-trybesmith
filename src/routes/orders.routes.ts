import { Router } from 'express';
import OrdersController from '../controllers/orders.controller';
import validationCreateOrder from '../middlewares/orders.middleware';

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.get('/orders', ordersController.getAll);
ordersRouter.post('/orders', validationCreateOrder, ordersController.create);

export default ordersRouter;