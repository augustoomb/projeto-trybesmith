import { Pool } from 'mysql2/promise';
import Order from '../interfaces/order.interfaces';

export default class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Order[]> {
    const result = await this.connection.execute(`
      SELECT O.id, O.userId, JSON_ARRAYAGG(P.id) AS productsIds FROM Trybesmith.Orders AS O
      INNER JOIN Trybesmith.Products AS P
      ON O.id = P.orderId
      GROUP BY O.id, O.userId
      ORDER BY O.userId;
    `);
    
    const [data] = result;
    
    return data as Order[];
  }  
}

/*

SELECT O.id, O.userId, JSON_ARRAYAGG(P.id) AS productsIds FROM Trybesmith.Orders AS O
INNER JOIN Trybesmith.Products AS P
ON O.id = P.orderId
GROUP BY O.id, O.userId;

*/
