import { Router } from 'express';

const checkRouter = Router();

checkRouter.get('/', async (req, res) => res.status(200).json({ status: 'online' }));

export default checkRouter;
