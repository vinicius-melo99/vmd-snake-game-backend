import { get } from 'lodash';
import Ranking from '../database/models/Ranking';
import HttpStatus from '../utils/HttpStatus';
import serviceResponse from './serviceResponse';
import User from '../database/models/User';

class RankingController {
  async index() {
    try {
      const allRankingStats = await Ranking.findAll({
        include: {
          model: User,
          as: 'user',
          attributes: {
            exclude: ['id', 'password'],
          },
        },
        order: [['score', 'desc']],
      });

      return serviceResponse(false, HttpStatus.OK, allRankingStats);
    } catch {
      const error = ['Erro interno no servidor.'];
      return serviceResponse(true, HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async create(score, userId) {
    try {
      await Ranking.create({ score, userId });

      return serviceResponse(false, HttpStatus.CREATED);
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

  async update(score, userId) {
    try {
      await Ranking.update(score, {
        where: { userId },
      });

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
