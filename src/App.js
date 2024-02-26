import express from 'express';
import cors from 'cors';
import * as routes from './routes';

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
    this.app.use('/online', routes.checkRouter);
    this.app.use('/users', routes.usersRoute);
  }
}

export default new App().app;
