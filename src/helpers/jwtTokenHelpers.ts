// import jwt = require('jsonwebtoken');

// const JWT_SECRET = 'umaSenhaParaProjeto';

// const createToken = (payload: any) => {
//   const token = jwt.sign(payload, JWT_SECRET, { algorithm: 'HS256', expiresIn: '7d' });
//   return token;
// };

// const verifyToken = (token: string) => {
//   const dados = jwt.verify(token, JWT_SECRET);
//   return dados;
// };

// module.exports = { createToken, verifyToken };

import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import User from '../interfaces/user.interfaces';

class JwtTokenHelpers {
  public secret: string;

  constructor() {
    this.secret = 'umaSenhaParaProjeto';
  }

  public createToken(payload: User): string {
    const token = jwt.sign(payload, this.secret, { algorithm: 'HS256', expiresIn: '7d' });
    return token;
  }

  public verifyToken(token: string): User | JsonWebTokenError {
    try {
      const data = jwt.verify(token, this.secret);
      return data as User;
    } catch (error) {
      return error as JsonWebTokenError;
    }
  }
}

export default JwtTokenHelpers;
