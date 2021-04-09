const moment = require("moment");

const connection = require("../infra/connection");

class Scheduling {
  index(req, res) {
    const sql = "SELECT * FROM schedules";

    connection.query(sql, (error, results) => {
      if (error) return res.status(400).json(error);

      return res.json({ success: true, schedules: results });
    });
  }

  show(req, res) {
    const { id } = req.params;
    const sql = "SELECT * FROM schedules WHERE id = ?";

    connection.query(sql, id, (error, results) => {
      if (error) return res.status(400).json(error);
      if (results.length === 0)
        return res.status(400).json({
          success: false,
          message: `Não foi localizado agendamento com o id ${id}`,
        });

      return res.json({ success: true, scheduling: results[0] });
    });
  }

  create(req, res) {
    const scheduling = req.body;
    const sql = "INSERT INTO schedules SET ?";

    const service_date = moment(scheduling.service_date).format("YYYY-MM-DD");
    const scheduling_date = moment().format("YYYY-MM-DD");
    const schedulingWithDates = {
      ...scheduling,
      scheduling_date,
      service_date,
    };

    const nameCustomerIsValid = scheduling.customer_name.length > 3;
    const dateIsValid = moment(scheduling.service_date).isSameOrAfter(
      scheduling_date
    );

    const validations = [
      {
        name: "service_date",
        isValid: dateIsValid,
        message: "Data do agendamento deve ser igual ou porterior a data atual",
      },
      {
        name: "customer_name",
        isValid: nameCustomerIsValid,
        message: "O nome do cliente deve ter pelo menos 3 caracteres",
      },
    ];

    const errors = validations.filter((validation) => !validation.isValid);

    if (errors.length > 0) return res.status(400).json(errors);

    connection.query(sql, schedulingWithDates, (error, results) => {
      if (error) return res.status(400).json(error);

      return res.status(201).json({
        success: true,
        scheduling: {
          id: results.insertId,
          ...schedulingWithDates,
        },
      });
    });
  }

  update(req, res) {
    const { id } = req.params;
    const scheduling = req.body;
    const sql = "UPDATE schedules SET ? WHERE id = ?";

    if (scheduling.service_date)
      moment(scheduling.service_date).format("YYYY-MM-DD");

    connection.query(sql, [scheduling, id], (error, results) => {
      if (error) return res.status(400).json(error);
      if (results.affectedRows === 0)
        return res.status(400).json({
          success: false,
          message: `Não foi localizado agendamento com o id ${id}`,
        });

      return res.status(202).json({
        success: true,
        message: `Agendamento com id ${id} alterado com sucesso`,
        service_date: scheduling.service_date,
      });
    });
  }

  delete(req, res) {
    const { id } = req.params;
    const sql =
      "DELETE FROM schedules WHERE id = ?; \
      SET @m = (SELECT MAX(id) + 1 FROM schedules); \
      SET @s = CONCAT('ALTER TABLE schedules AUTO_INCREMENT=', @m); \
      PREPARE stmt1 FROM @s;\
      EXECUTE stmt1;\
      DEALLOCATE PREPARE stmt1;";

    connection.query(sql, id, (error, results) => {
      if (error) return res.status(400).json(error);
      if (results[0].affectedRows === 0)
        return res.status(400).json({
          success: false,
          message: `Não foi localizado agendamento com o id ${id}`,
        });

      return res.status(202).json({
        success: true,
        message: `Agendamento com id ${id} excluido com sucesso`,
      });
    });
  }
}

module.exports = new Scheduling();
