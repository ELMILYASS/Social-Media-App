const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Access permitted" });
});

module.exports = router;
