const configExpress = require("./config/configExpress");
const connection = require("./db/connection");

const PORT = process.env.PORT || 3333;

const app = configExpress();

connection.connect((error) => {
  if (error) throw error;

  app.listen(PORT, () => {
    console.info("\n\033[36m[running] on http://localhost:" + PORT);
    console.log("\033[32m[db_mysql] database is now connected");
  });
});
