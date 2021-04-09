const configExpress = require("./config/configExpress");
const db = require("./database/models");

const PORT = process.env.PORT || 3333;

try {
  db.sequelize.authenticate();

  const app = configExpress();

  app.listen(PORT, () => {
    console.info("\n\033[36m[running] on http://localhost:" + PORT);
    console.log("\033[32m[db_mysql] database is now connected\033[0m\n");
  });
} catch (error) {
  if (error) throw error;
}
