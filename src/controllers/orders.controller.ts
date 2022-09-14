import { Request, Response } from 'express';
import JwtTokenHelpers from '../helpers/jwtTokenHelpers';
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

  public create = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    if (!authorization) {
      res.status(401).json({ message: 'Token not found' });
    } else {
      const registeredOrderId = await this.orderService.create(authorization);
      res.status(201).json({ teste: `teste OK. O order ID é: ${registeredOrderId}` });
    }
  };
}

export default OrdersController;
