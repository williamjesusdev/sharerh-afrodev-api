module.exports = (app) => {
  app.get("/", (req, res) => {
    res.json({ success: true, message: "Hello AfroDev" });
  });

  app.get("/agendamentos", (req, res) => {
    res.json({ success: true, agendamentos: [] });
  });
};
