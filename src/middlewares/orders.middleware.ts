import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const schemaArrProdId = Joi.object({
  productsIds: Joi.array()
    .items(Joi.number())
    .min(1)
    .required()
    .messages({ 'array.min': '"productsIds" must include only numbers' }),
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

function validationCreateOrder(req: Request, res: Response, next: NextFunction) {
  const productsIds: number[] = req.body;

  if (schemaArrProdId.validate(productsIds).error) {
    const errorMessage = schemaArrProdId.validate(productsIds).error?.message;
    const typeError = schemaArrProdId.validate(productsIds).error?.details[0].type;
    console.log(typeError);
    const codeError = getCodeError(String(typeError));
    return res.status(codeError).json({ message: errorMessage });
  }

  next();
}

export default validationCreateOrder;
