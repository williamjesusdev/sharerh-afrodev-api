const moment = require("moment");
const db = require("../database/models");
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
      .then((agendamento) => {
        if (agendamento) return res.json(agendamento);
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
    const agendamento = req.body;

    const data_criacao = moment().format("YYYY-MM-DD");
    const data_agendamento = moment(agendamento.data_agendamento).format(
      "YYYY-MM-DD"
    );

    const agendamentoAtualizado = {
      ...agendamento,
      data_agendamento,
    };

    const nomeEValido = agendamento.nome_cliente.length > 3;
    const dataEValida = moment(agendamento.data_agendamento).isSameOrAfter(
      data_criacao
    );

    const validations = [
      {
        name: "data_agendamento",
        isValid: dataEValida,
        message: "Data do agendamento deve ser igual ou porterior a data atual",
      },
      {
        name: "nome_cliente",
        isValid: nomeEValido,
        message: "O nome do cliente deve ter pelo menos 3 caracteres",
      },
    ];

    const errors = validations.filter((validation) => !validation.isValid);

    if (errors.length > 0) return res.status(400).json(errors);

    Agendamento.create(agendamentoAtualizado)
      .then((agendamento) => {
        return res.status(201).json(agendamento);
      })
      .catch(({ errors }) => {
        return res.status(400).json(errors);
      });
  }

  async update(req, res) {
    const { id } = req.params;
    const agendamentoBody = req.body;

    const dadosAtualizaveis = {};
    const camposAtualizaveis = [
      "nome_cliente",
      "nome_servico",
      "status",
      "data_agendamento",
    ];

    Agendamento.findOne({ where: { id } }).then((agendamento) => {
      if (agendamento) {
        camposAtualizaveis.forEach((campo) => {
          const valor = agendamentoBody[campo];
          if (typeof valor === "string" && valor.length > 0) {
            dadosAtualizaveis[campo] = valor;
          }
        });

        if (dadosAtualizaveis.data_agendamento)
          moment(dadosAtualizaveis.data_agendamento).format("YYYY-MM-DD");

        return Agendamento.update(dadosAtualizaveis, { where: { id } })
          .then((agendamento) => {
            return res.status(204).send(agendamento);
          })
          .catch(({ errors }) => {
            return res.status(400).json(errors);
          });
      }

      return res.status(404).json({
        error: 404,
        message: `Não foi encontrado nenhum agendamento para o id ${id}`,
      });
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const agendamento = await Agendamento.findOne({ where: { id } });

    if (agendamento) {
      return Agendamento.destroy({ where: { id } })
        .then(async () => {
          const result = await Agendamento.findAll({
            attributes: [db.sequelize.fn("MAX", db.sequelize.col("id")), "id"],
          });
          const sql = `ALTER TABLE agendamentos AUTO_INCREMENT=${result[0].id}`;
          await db.sequelize.query(sql);
          return res.status(204).send();
        })
        .catch(({ errors }) => {
          return res.status(400).json(errors);
        });
    }

    return res.status(404).json({
      error: 404,
      message: `Não foi encontrado nenhum agendamento para o id ${id}`,
    });
  }
}

module.exports = new Agendamentos();
