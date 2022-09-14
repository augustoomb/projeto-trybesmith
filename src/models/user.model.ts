import { Pool, ResultSetHeader } from 'mysql2/promise';
import User from '../interfaces/user.interfaces';
import UserLogin from '../interfaces/userLogin.interfaces';

export default class UserModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<User[]> {
    const result = await this.connection.execute('SELECT * FROM Trybesmith.Users');
    const [data] = result;
    
    return data as User[];
  }

  public async getByUsernameAndPass(userLogin: UserLogin): Promise<User> {
    const { username, password } = userLogin;
    const result = await this.connection.execute(`SELECT * FROM Trybesmith.Users
    WHERE username=? AND password=?`, [username, password]);
    const [data] = result;
    const [user] = data as User[];
    return { ...user };
  }

  public async create(user: User): Promise<User> {
    const { username, classe, level, password } = user;

    const [result] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)',
      [username, classe, level, password],
    );
    
    return { id: result.insertId, ...user };
  }
}
