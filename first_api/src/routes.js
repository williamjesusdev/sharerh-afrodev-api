const Scheduling = require("./controllers/Scheduling");

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.json({ success: true, message: "Hello AfroDev" });
  });

  app.get("/agendamentos", Scheduling.index);
  app.get("/agendamentos/:id", Scheduling.show);

  app.post("/agendamentos", Scheduling.create);
  app.delete("/agendamentos/:id", Scheduling.delete);
  app.put("/agendamentos/:id", Scheduling.update);
};
