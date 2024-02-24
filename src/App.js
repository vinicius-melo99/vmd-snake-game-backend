import express from 'express';
import cors from 'cors';
import { checkRouter } from './routes';

class App {
  constructor() {
    this.app = express();
    this.expressConfig();
    this.routesConfig();
  }

  expressConfig() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  routesConfig() {
    this.app.use('/online', checkRouter);
  }
}

export default new App().app;
