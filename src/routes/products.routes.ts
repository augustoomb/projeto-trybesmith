import { Router } from 'express';
import ProductsController from '../controllers/products.controller';
import validationCreateProduct from '../middlewares/products.middleware';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get('/products', productsController.getAll);
productsRouter.post('/products', validationCreateProduct, productsController.create);

export default productsRouter;