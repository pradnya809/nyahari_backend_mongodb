const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json("Hello From Web");
});

router.post("/feedback", (req, res) => {
  const { email, feedback } = req.body;
  res.json("Hello From web feedback");
});

module.exports = router;
