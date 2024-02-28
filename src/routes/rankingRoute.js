import { Router } from 'express';
import Middlewares from '../middlewares/Middlewares';
import rankingControllers from '../controllers/RankingControllers';

const rankingRouter = Router();

rankingRouter.get('/', rankingControllers.index);

rankingRouter.post('/', Middlewares.tokenValidation, rankingControllers.create);

rankingRouter.put('/', Middlewares.tokenValidation, rankingControllers.update);

export default rankingRouter;
