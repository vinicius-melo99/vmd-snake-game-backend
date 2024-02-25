import HttpStatus from '../utils/HttpStatus';

export default class Middlewares {
  static userConstraints(req, res, next) {
    const { username, email, passwordText } = req.body;

    if (!username || !email || !passwordText) {
      const errorMessage = 'A requisição deve conter os campos: username, email e passwordText';
      return res.status(HttpStatus.BAD_REQUEST).json({ error: [errorMessage] });
    }

    return next();
  }
}
