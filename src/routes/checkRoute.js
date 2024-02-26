import { Router } from 'express';

const checkRouter = Router();

checkRouter.get('/', (req, res) => res.status(200).json({ status: 'Online' }));

export default checkRouter;
