import { sign, verify } from 'jsonwebtoken';
import { resolve } from 'path';
import dotenv from 'dotenv';

class JWTManager {
  constructor() {
    dotenv.config({ path: resolve(__dirname, '..', '..', '.env') });
    this.secret = process.env.TOKEN_SECRET;
    this.expiresIn = process.env.TOKEN_EXPIRATION;
  }

  generateToken(payload) {
    return sign(payload, this.secret, {
      expiresIn: this.expiresIn,
    });
  }

  verifyToken(token) {
    return verify(token, this.secret);
  }
}

export default new JWTManager();
