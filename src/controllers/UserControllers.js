import userServices from '../services/UserServices';

class UserController {
  async auth(req, res) {
    const { error, status, data } = await userServices.auth(req.body);

    if (error) return res.status(status).json({ errors: data });

    return res.status(status).json(data);
  }

  async index(req, res) {
    const { error, status, data } = await userServices.index();

    if (error) return res.status(status || 500).json({ errors: data });

    return res.status(status).json(data);
  }

  async create(req, res) {
    const { error, status, data } = await userServices.create(req.body);

    if (error) return res.status(status).json({ errors: data });

    return res.status(status).json(data);
  }
}

export default new UserController();
