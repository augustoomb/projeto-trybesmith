import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import Product from '../interfaces/product.interfaces';

const schemaName = Joi.object({
  name: Joi.string()
    .min(3)
    .required(),  
  amount: Joi.string()
    .min(3)
    .required(),  
});

const getCodeError = (typeError:string):number => {
  switch (typeError) {
    case 'any.required': // campo nulo ou não informado
      return 400;
      break;
    case 'string.min': // tamanho minimo não foi atingido
      return 422;
      break;
    case 'string.base': // valor que não é string foi passado
      return 422;
      break;

    default:
      return 500;
  }
};

function validationCreateProduct(req: Request, res: Response, next: NextFunction) {
  const product: Product = req.body;

  if (schemaName.validate(product).error) {
    const errorMessage = schemaName.validate(product).error?.message;
    const typeError = schemaName.validate(product).error?.details[0].type;
    const codeError = getCodeError(String(typeError));
    return res.status(codeError).json({ message: errorMessage });
  }

  next();
}

export default validationCreateProduct;
