const express = require("express");
const consign = require("consign");

module.exports = () => {
  const app = express();

  app.use(express.json());

  consign({ cwd: "src" }).include("routes.js").include("controllers").into(app);

  return app;
};
