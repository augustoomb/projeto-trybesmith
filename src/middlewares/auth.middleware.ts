import { NextFunction, Response } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import JwtTokenHelpers from '../helpers/jwtTokenHelpers';
import { RequestAuth } from '../interfaces/requestAuth.interfaces';

function validationAuth(req: RequestAuth, res: Response, next: NextFunction) {
  const jwtTokenHelpers = new JwtTokenHelpers();
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({ message: 'Token not found' });
  } else {
    const checkedToken = jwtTokenHelpers.verifyToken(authorization);
    if (checkedToken instanceof JsonWebTokenError) { 
      res.status(401).json({ message: 'Invalid token' });
    } else {
      req.userId = checkedToken.id;
      next();
    }
  }   
}

export default validationAuth;

/*
const { authorization } = req.headers;
    if (!authorization) {
      res.status(401).json({ message: 'Token not found' });
    } else {
      const checkedToken = this.orderService.checkToken(authorization);
      if (!checkedToken) { 
        res.status(401).json({ message: 'Invalid token' });
      } else {
        const registeredOrderId = await this.orderService.create(checkedToken);
        res.status(201).json({ teste: `teste OK. O order ID é: ${registeredOrderId}` });
      }
    } 
*/