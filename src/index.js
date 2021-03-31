const configExpress = require("./config/configExpress");

const PORT = process.env.PORT || 3333;

const app = configExpress();

app.listen(PORT, () => {
  console.info("\n\033[36m[running] on http://localhost:" + PORT);
});
