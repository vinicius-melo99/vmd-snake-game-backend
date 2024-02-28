import { get } from 'lodash';
import Ranking from '../database/models/Ranking';
import HttpStatus from '../utils/HttpStatus';
import serviceResponse from './serviceResponse';

class RankingController {
  async create(score, userId) {
    try {
      await Ranking.create({ score, userId });

      return serviceResponse(false, HttpStatus.NO_CONTENT);
    } catch (e) {
      const errors = get(e, 'errors', false);

      if (errors) {
        const errorMessages = errors.map((error) => error.message);
        return serviceResponse(true, HttpStatus.BAD_REQUEST, errorMessages);
      }

      const error = ['Erro interno no servidor.'];
      return serviceResponse(true, HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }
}

export default new RankingController();
