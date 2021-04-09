const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ success: true, message: "Hello AfroDev" });
});

module.exports = router;
