import { NextFunction, Request, Response } from 'express';
import UserLogin from '../interfaces/userLogin.interfaces';

function validationUserLogin(req: Request, res: Response, next: NextFunction) {
  const userLogin: UserLogin = req.body;

  if (!userLogin.username || userLogin.username === '') {
    return res.status(400).json({ message: '"username" is required' });
  }

  if (!userLogin.password || userLogin.password === '') {
    return res.status(400).json({ message: '"password" is required' });
  }

  next();
}

export default validationUserLogin;
