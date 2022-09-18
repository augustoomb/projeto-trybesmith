import { Request, Response } from 'express';
// import { JsonWebTokenError } from 'jsonwebtoken';
import JwtTokenHelpers from '../helpers/jwtTokenHelpers';
import { RequestAuth } from '../interfaces/requestAuth.interfaces';
import OrderService from '../services/orders.services';

class OrdersController {
  public orderService: OrderService;

  public jwtTokenHelpers: JwtTokenHelpers;

  constructor() {
    this.orderService = new OrderService();
    this.jwtTokenHelpers = new JwtTokenHelpers();
  }

  public getAll = async (_req: Request, res: Response) => {
    const orders = await this.orderService.getAll();
    res.status(200).json(orders);
  };

  public create = async (req: RequestAuth, res: Response) => {
    const { userId } = req;
    const { productsIds } = req.body; 
    console.log(`userId é ${userId}`);
    console.log(`productsIds é ${productsIds}`);
    const objOrderUpdate = await this.orderService.create(userId || 0, productsIds);
    res.status(201).json(objOrderUpdate);  
  };
}

export default OrdersController;
