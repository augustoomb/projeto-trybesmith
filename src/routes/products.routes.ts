import { Router } from 'express';
import ProductsController from '../controllers/products.controller';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get('/products', productsController.getAll);
productsRouter.post('/products', productsController.create);

export default productsRouter;