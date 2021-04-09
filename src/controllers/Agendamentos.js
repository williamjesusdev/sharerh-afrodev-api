const { Agendamento } = require("../database/models");

class Agendamentos {
  async index(req, res) {
    Agendamento.findAll()
      .then((agendamentos) => {
        return res.json(agendamentos);
      })
      .catch(({ errors }) => {
        return res.status(400).json(errors);
      });
  }

  async show(req, res) {
    const { id } = req.params;

    Agendamento.findOne({ where: { id } })
      .then((agendamentos) => {
        if (agendamentos) return res.json(agendamentos);
        return res.status(404).json({
          error: 404,
          message: `Não foi encontrado nenhum agendamento para o id ${id}`,
        });
      })
      .catch(({ errors }) => {
        return res.status(400).json(errors);
      });
  }

  async create(req, res) {
    const body = req.body;

    Agendamento.create(body)
      .then((Agendamento) => {
        return res.json(Agendamento);
      })
      .catch(({ errors }) => {
        return res.status(400).json(errors);
      });
  }
}

module.exports = new Agendamentos();
