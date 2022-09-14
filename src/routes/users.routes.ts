import { Router } from 'express';
import UsersController from '../controllers/users.controller';
import validationCreateUser from '../middlewares/users.middleware';
import validationUserLogin from '../middlewares/usersLogin.middleware';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/users', usersController.getAll);
usersRouter.post('/users', validationCreateUser, usersController.create);
usersRouter.post('/login', validationUserLogin, usersController.login);

export default usersRouter;