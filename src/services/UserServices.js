// import { get } from 'lodash';
import serviceResponse from './serviceResponse';
import HttpStatus from '../utils/HttpStatus';
import User from '../database/models/User';

class UserServices {
  async index() {
    try {
      const users = await User.findAll();

      return serviceResponse(false, HttpStatus.OK, users);
    } catch (e) {
      const error = ['Erro interno no servidor.'];

      return serviceResponse(false, HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }
}

export default new UserServices();
