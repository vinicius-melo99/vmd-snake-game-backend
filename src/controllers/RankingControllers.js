import rankingServices from '../services/RankingServices';

class RankingController {
  async index(req, res) {
    const { error, status, data } = await rankingServices.index();

    if (error) return res.status(status).json({ errors: data });

    return res.status(status).json(data);
  }

  async create(req, res) {
    const { id } = req.payload;
    const { score } = req.body;

    const { error, status, data } = await rankingServices.create(score, id);

    if (error) return res.status(status).json({ errors: data });

    return res.status(status).json(data);
  }

  async update(req, res) {
    const { id } = req.payload;
    const { score } = req.body;

    const { error, status, data } = await rankingServices.update(score, id);

    if (error) return res.status(status).json({ errors: data });

    return res.status(status).json(data);
  }
}

export default new RankingController();
