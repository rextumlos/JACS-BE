const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Build test successful");
});

module.exports = router;
