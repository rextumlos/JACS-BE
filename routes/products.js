const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Product test successful");
});

module.exports = router;
