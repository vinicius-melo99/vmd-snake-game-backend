import userServices from '../services/UserServices';

class UserController {
  async auth(req, res) {
    const { error, status, data } = await userServices.auth(req.body);

    if (error) return res.status(status).json({ errors: data });

    return res.status(status).json(data);
  }

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

  async find(req, res) {
    const { id } = req.params;

    const { error, status, data } = await userServices.find(+id);

    if (error) return res.status(status).json({ errors: data });

    return res.status(status).json(data);
  }

  async delete(req, res) {
    const { id } = req.payload;

    const { error, status, data } = await userServices.delete(id);

    if (error) return res.status(status).json({ errors: data });

    return res.status(status).json(data);
  }

  async update(req, res) {
    const { id } = req.payload;

    const { error, status, data } = await userServices.update(req.body, id);

    if (error) return res.status(status).json({ errors: data });

    return res.status(status).json(data);
  }
}

export default new UserController();
