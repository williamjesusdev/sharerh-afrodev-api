const express = require("express");

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Hello World AfroDev",
  });
});

app.listen(PORT, () => {
  console.info("\033[36m[running] on http://localhost:" + PORT);
});
