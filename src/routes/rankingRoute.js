import { Router } from 'express';
import Middlewares from '../middlewares/Middlewares';
import rankingControllers from '../controllers/RankingControllers';

const rankingRouter = Router();

rankingRouter.post('/', Middlewares.tokenValidation, rankingControllers.create);

export default rankingRouter;
