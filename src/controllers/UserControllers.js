import userServices from '../services/UserServices';

class UserController {
  async index(req, res) {
    const { error, status, data } = await userServices.index();

    if (error) return res.status(status).json({ errors: data });

    return res.status(status).json(data);
  }

  async create(req, res) {
    const { error, status, data } = await userServices.create(req.body);

    if (error) return res.status(status).json({ errors: data });

    return res.status(status).json(data);
  }
}

export default new UserController();
