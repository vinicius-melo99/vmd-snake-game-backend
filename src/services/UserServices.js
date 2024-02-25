// import { get } from 'lodash';
import { get } from 'lodash';
import bcrypt from 'bcryptjs';
import serviceResponse from './serviceResponse';
import HttpStatus from '../utils/HttpStatus';
import User from '../database/models/User';
import Ranking from '../database/models/Ranking';
import jwtManager from '../security/JWTManager';

class UserServices {
  async auth(authData) {
    try {
      const { username = 0, email = 0, passwordText } = authData;

      const user = await User.findOne({ where: username ? { username } : { email } });

      if (!user || !bcrypt.compareSync(passwordText, user.dataValues.password)) {
        const errorMessage = ['Usuário não encontrado. Tente novamente.'];
        return serviceResponse(true, HttpStatus.NOT_FOUND, errorMessage);
      }

      const payload = {
        id: user.dataValues.id,
        username: user.dataValues.username,
        password: user.dataValues.password,
      };

      const token = jwtManager.generateToken(payload);

      return serviceResponse(false, HttpStatus.OK, { token });
    } catch {
      const errorMessage = ['Erro interno no servidor.'];

      return serviceResponse(true, HttpStatus.INTERNAL_SERVER_ERROR, errorMessage);
    }
  }

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
