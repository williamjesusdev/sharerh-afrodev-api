class Tables {
  init(connection) {
    this.connection = connection;
    this.createTableSchedules();
  }

  createTableSchedules() {
    const sql = `CREATE TABLE IF NOT EXISTS schedules (
      id INT NOT NULL AUTO_INCREMENT, 
      customer_name VARCHAR(50) NOT NULL,
      service VARCHAR(50) NOT NULL,
      status VARCHAR(20) NOT NULL,
      service_date DATE NOT NULL,
      scheduling_date DATE NOT NULL,
      PRIMARY KEY (id)
    )`;

    this.connection.query(sql, (error) => {
      if (error) throw error;
    });
  }
}

module.exports = new Tables();
