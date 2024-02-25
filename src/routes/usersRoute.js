import { Router } from 'express';
import userControllers from '../controllers/UserControllers';

const usersRoute = Router();

usersRoute.get('/', userControllers.index);

export default usersRoute;
