// import { get } from 'lodash';
import { get } from 'lodash';
import serviceResponse from './serviceResponse';
import HttpStatus from '../utils/HttpStatus';
import User from '../database/models/User';
import Ranking from '../database/models/Ranking';

class UserServices {
  async index() {
    try {
      const users = await User.findAll({
        include: {
          model: Ranking,
          as: 'ranking',
        },

        attributes: {
          exclude: ['password'],
        },
      });

      return serviceResponse(false, HttpStatus.OK, users);
    } catch (e) {
      const error = ['Erro interno no servidor.'];

      return serviceResponse(false, HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async create(user) {
    try {
      const { id, username, email } = await User.create(user);

      return serviceResponse(false, HttpStatus.CREATED, { id, username, email });
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

export default new UserServices();
