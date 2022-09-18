import { Pool, ResultSetHeader } from 'mysql2/promise';
import Product from '../interfaces/product.interfaces';

export default class ProductModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Product[]> {
    const result = await this.connection.execute('SELECT * FROM Trybesmith.Products');
    const [data] = result;
    
    return data as Product[];
  }

  public async create(product: Product): Promise<Product> {
    const { name, amount } = product;

    const [result] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)',
      [name, amount],
    );
    
    return { id: result.insertId, ...product };
  }

  public async update(productId: number, orderId: number) {
    await this.connection.execute<ResultSetHeader>(
      'UPDATE Trybesmith.Products SET orderId = ? WHERE (id = ?)',
      [orderId, productId],
    );
  }
}
