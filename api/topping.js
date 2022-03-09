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

router.put("/gettopping", async (req, res) => {
  const { ItemId } = req.body;
  try {
    const toppings = await Toppings.find({
      ItemId: ItemId,
    });
    // console.log(toppings);

    res.send(toppings);
  } catch (err) {
    res.status(500).json(err);
    // console.log(err);
  }
});

module.exports = router;
