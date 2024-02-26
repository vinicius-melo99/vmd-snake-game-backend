import { Router } from 'express';
import Middlewares from '../middlewares/Middlewares';

const checkRouter = Router();

checkRouter.get('/', Middlewares.tokenValidation, (req, res) => res.status(200).json({ status: 'Online' }));

export default checkRouter;
