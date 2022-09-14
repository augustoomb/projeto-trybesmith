import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import User from '../interfaces/user.interfaces';

const schemaName = Joi.object({
  username: Joi.string()
    .min(3)
    .required(),  
  classe: Joi.string()
    .min(3)
    .required(),  
  level: Joi.number()
    .min(1)
    .required(),  
  password: Joi.string()
    .min(8)
    .required(),  
});

const getCodeError = (typeError:string):number => {
  switch (typeError) {
    case 'any.required': // campo nulo ou não informado
      return 400;
      break;

    default:
      return 422;
  }
};

function validationCreateUser(req: Request, res: Response, next: NextFunction) {
  const user: User = req.body;

  if (schemaName.validate(user).error) {
    const errorMessage = schemaName.validate(user).error?.message;
    const typeError = schemaName.validate(user).error?.details[0].type;
    console.log(typeError);
    const codeError = getCodeError(String(typeError));
    return res.status(codeError).json({ message: errorMessage });
  }

  next();
}

export default validationCreateUser;
