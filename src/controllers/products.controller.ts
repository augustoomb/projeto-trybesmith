import { Request, Response } from 'express';
import ProductService from '../services/products.services';

class ProductsController {
  public productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  public getAll = async (req: Request, res: Response) => {
    const products = await this.productService.getAll();
    res.status(200).json(products);
  };
}

export default ProductsController;
