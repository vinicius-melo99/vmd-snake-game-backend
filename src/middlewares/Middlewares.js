import HttpStatus from '../utils/HttpStatus';
import jwtManager from '../security/JWTManager';
import userServices from '../services/UserServices';

export default class Middlewares {
  static userConstraints(req, res, next) {
    const { username, email, passwordText } = req.body;

    if (!username || !email || !passwordText) {
      const errorMessage = 'A requisição deve conter os campos: username, email e passwordText';
      return res.status(HttpStatus.BAD_REQUEST).json({ error: [errorMessage] });
    }

    return next();
  }

  static async tokenValidation(req, res, next) {
    const token = req.header('authorization');

    if (!token) {
      return res.status(401).json({ errors: ['Rota restrita para usuários autorizados.'] });
    }

    try {
      const decodedData = jwtManager.verifyToken(token);
      const {
        id, username, email,
      } = decodedData;

      const { data } = await userServices.find(id);

      if (data.username !== username || data.email !== email) {
        throw new Error(HttpStatus.UNAUTHORIZED);
      }

      req.payload = { id, username, email };

      return next();
    } catch {
      const errors = ['Sessão expirada ou inválida.'];
      return res.status(500).json({ errors });
    }
  }
}
