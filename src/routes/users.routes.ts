import { Router } from 'express';
import UsersController from '../controllers/users.controller';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/users', usersController.getAll);
usersRouter.post('/users', usersController.create);

export default usersRouter;