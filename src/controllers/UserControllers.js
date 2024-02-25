import userServices from '../services/UserServices';

class UserController {
  constructor() {
    this.test = 10;
  }

  async index(req, res) {
    const { error, status, data } = await userServices.index();

    if (error) return res.status(status).json({ errors: data });

    return res.status(status).json(data);
  }
}

export default new UserController();
