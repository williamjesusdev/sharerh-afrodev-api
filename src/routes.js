const router = require("express").Router();

const Agendamentos = require("./controllers/Agendamentos");

router.get("/", (req, res) => {
  res.json({ success: true, message: "Hello AfroDev" });
});

router.get("/agendamentos", Agendamentos.index);
router.get("/agendamentos/:id", Agendamentos.show);

router.post("/agendamentos", Agendamentos.create);

module.exports = router;
