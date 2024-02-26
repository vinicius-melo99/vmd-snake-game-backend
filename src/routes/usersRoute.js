import { Router } from 'express';
import userControllers from '../controllers/UserControllers';
import Middlewares from '../middlewares/Middlewares';

const usersRoute = Router();

usersRoute.get('/', userControllers.index);
usersRoute.get('/find', Middlewares.tokenValidation, userControllers.find);

usersRoute.post('/', Middlewares.userConstraints, userControllers.create);
usersRoute.post('/auth', userControllers.auth);

usersRoute.delete('/delete', Middlewares.tokenValidation, userControllers.delete);

usersRoute.put('/edit', Middlewares.tokenValidation, userControllers.update);

export default usersRoute;
