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
        email: user.dataValues.email,
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

  async find(id) {
    try {
      const user = await User.findByPk(id, {
        attributes: {
          exclude: ['password'],
        },
      });

      if (!user) {
        const error = ['Usuário não encontrado'];
        return serviceResponse(true, HttpStatus.NOT_FOUND, error);
      }

      return serviceResponse(false, HttpStatus.OK, user);
    } catch {
      const error = ['Erro interno de servidor'];
      return serviceResponse(true, HttpStatus.INTERNAL_SERVER_ERROR, error);
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

  async delete(id) {
    try {
      const response = await User.destroy({ where: { id } });

      if (!response) {
        const error = ['Usuário não encontrado.'];
        return serviceResponse(false, HttpStatus.NOT_FOUND, error);
      }

      const message = 'Usuário deletado com sucesso.';

      return serviceResponse(false, HttpStatus.OK, { response: message });
    } catch {
      const error = ['Erro interno no servidor.'];
      return serviceResponse(false, HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async update(newData, id) {
    const { passwordText } = newData;
    try {
      const response = await User.update(newData, {
        where: { id },
        individualHooks: !!passwordText,
      });

      if (!response) {
        const error = ['Usuário não encontrado.'];
        return serviceResponse(false, HttpStatus.NOT_FOUND, error);
      }

      const { data } = await this.find(id);

      return serviceResponse(false, HttpStatus.OK, data);
    } catch (e) {
      const errors = get(e, 'errors', false);

      if (errors) {
        const errorMessages = errors.map((error) => error.message);
        return serviceResponse(true, HttpStatus.BAD_REQUEST, errorMessages);
      }

      // const error = ['Erro interno no servidor.'];
      return serviceResponse(false, HttpStatus.INTERNAL_SERVER_ERROR, e);
    }
  }
}

export default new UserServices();
