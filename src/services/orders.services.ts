// import { JsonWebTokenError } from 'jsonwebtoken';
import connection from '../models/connection';
import OrderModel from '../models/order.model';
import Order from '../interfaces/order.interfaces';

import JwtTokenHelpers from '../helpers/jwtTokenHelpers';
import ProductModel from '../models/product.model';
import CustomOrder from '../interfaces/customOrder.interfaces';
// import User from '../interfaces/user.interfaces';

class OrderService {
  public model: OrderModel;

  public productModel: ProductModel;

  public jwtTokenHelpers: JwtTokenHelpers;

  constructor() {
    this.model = new OrderModel(connection);
    this.productModel = new ProductModel(connection);
    this.jwtTokenHelpers = new JwtTokenHelpers();
  }

  public async getAll(): Promise<Order[]> {
    const orders = await this.model.getAll();
    return orders;
  }

  private createOrder = async (userId:number) => {
    const registeredOrderId = await this.model.create(userId);
    return registeredOrderId;
  };

  public async create(idUser: number, productsIds: number[]):Promise<CustomOrder> {
    const orderNumber = await this.createOrder(idUser || 0); // cadastrar order e pegar orderID - OK

    // pegar cada produto recebido do usuário - OK

    // ir no banco e em cada produto, colocar o orderId gerado lá em cima
    await Promise.all(
      productsIds.map((id) => this.productModel.update(id, orderNumber)),
    );

    // retornar userId + arr de productId acima
    return {
      userId: idUser,
      productsIds,
    };
  }
}

export default OrderService;
