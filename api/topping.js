const express = require("express");
const router = express.Router();
const Toppings = require("../models/Toppings");

router.post("/", async (req, res) => {
  try {
    console.log("I am Topping");

    const { name, ExtraCharge, quantity } = req.body;
    toppings = new Toppings({
      name,
      ExtraCharge,
      quantity,
    });

    await toppings.save();

    res.json("Toopings");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const toppings = await Toppings.find();
    console.log(toppings);

    res.json(toppings);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
