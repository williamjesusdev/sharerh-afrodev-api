class Tabelas {
  init(connection) {
    this.connection = connection;
    this.createTableAgendamentos();
  }

  createTableAgendamentos() {
    const sql = `CREATE TABLE IF NOT EXISTS agendamentos (
      id INT NOT NULL AUTO_INCREMENT, 
      nome_cliente VARCHAR(50) NOT NULL,
      servico VARCHAR(50) NOT NULL,
      status VARCHAR(20) NOT NULL,
      data_servico DATE NOT NULL,
      data_agendamento DATE NOT NULL,
      PRIMARY KEY (id)
    )`;

    this.connection.query(sql, (error) => {
      if (error) throw error;
    });
  }
}

module.exports = new Tabelas();
