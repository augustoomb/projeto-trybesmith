import { JsonWebTokenError } from 'jsonwebtoken';
import connection from '../models/connection';
import OrderModel from '../models/order.model';
import Order from '../interfaces/order.interfaces';

import JwtTokenHelpers from '../helpers/jwtTokenHelpers';
import User from '../interfaces/user.interfaces';

class OrderService {
  public model: OrderModel;

  public jwtTokenHelpers: JwtTokenHelpers;

  constructor() {
    this.model = new OrderModel(connection);
    this.jwtTokenHelpers = new JwtTokenHelpers();
  }

  public async getAll(): Promise<Order[]> {
    const orders = await this.model.getAll();
    return orders;
  }

  public async create(token: string):Promise<number> {
    const user:User | JsonWebTokenError = this.jwtTokenHelpers.verifyToken(token);

    if (user instanceof JsonWebTokenError || !user.id) {
      return 0;
    }

    const registeredOrderId = this.model.create(user.id);
    return registeredOrderId;
  }
}

export default OrderService;
