import { Router } from 'express';
import userControllers from '../controllers/UserControllers';
import Middlewares from '../middlewares/Middlewares';

const usersRoute = Router();

usersRoute.get('/', userControllers.index);

usersRoute.post('/', Middlewares.userConstraints, userControllers.create);
usersRoute.post('/auth', userControllers.auth);

export default usersRoute;
