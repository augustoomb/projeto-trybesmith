import { Router } from 'express';
import UsersController from '../controllers/users.controller';
import validationUserLogin from '../middlewares/users.middleware';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/users', usersController.getAll);
usersRouter.post('/users', usersController.create);
usersRouter.post('/login', validationUserLogin, usersController.login);

export default usersRouter;