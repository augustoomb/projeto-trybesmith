import connection from '../models/connection';
import UserModel from '../models/user.model';
import User from '../interfaces/user.interfaces';
import JwtTokenHelpers from '../helpers/jwtTokenHelpers';

class UserService {
  public model: UserModel;

  public jwt: JwtTokenHelpers;

  constructor() {
    this.model = new UserModel(connection);
    this.jwt = new JwtTokenHelpers();
  }

  public async getAll(): Promise<User[]> {
    const users = await this.model.getAll();
    return users;
  }

  public async create(user: User): Promise<string> {
    const userCreated = await this.model.create(user);
    const token = this.jwt.createToken(userCreated);

    return token;
  }
}

export default UserService;
