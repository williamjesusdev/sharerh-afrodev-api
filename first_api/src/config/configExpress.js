const express = require("express");
const consign = require("consign");

module.exports = () => {
  const app = express();

  app.use(express.json());

  consign({ cwd: "src" }).include("routes.js").into(app);

  return app;
};
