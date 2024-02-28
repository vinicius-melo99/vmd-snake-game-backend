import rankingServices from '../services/RankingServices';

class RankingController {
  async create(req, res) {
    const { id } = req.payload;
    const { score } = req.body;

    const { error, status, data } = await rankingServices.create(score, id);

    if (error) return res.status(status).json({ errors: data });

    return res.status(status).json(data);
  }
}

export default new RankingController();
