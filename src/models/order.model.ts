import { Pool, ResultSetHeader } from 'mysql2/promise';
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

  // recebe o ID do user logado retorna o ID da order cadastrada
  public async create(userId: number): Promise<number> {
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Orders (userId) VALUES (?)',
      [userId],
    );

    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return insertId;
  }
}
