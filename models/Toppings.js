const mongoose = require("mongoose");

const ToppingsSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  ExtraCharge: {
    type: String,
  },
  quantity: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Topping = mongoose.model("toppings", ToppingsSchema);
