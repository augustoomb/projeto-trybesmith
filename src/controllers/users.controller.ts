import { Request, Response } from 'express';
import UserService from '../services/users.services';

class UsersController {
  public userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public getAll = async (_req: Request, res: Response) => {
    const users = await this.userService.getAll();
    res.status(200).json(users);
  };

  public create = async (req: Request, res: Response) => {
    const user = req.body;

    const tokenUserCreated = await this.userService.create(user);
    res.status(201).json({ token: tokenUserCreated });
  };
}

export default UsersController;
