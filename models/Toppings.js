const mongoose = require("mongoose");

const ToppingsSchema = new mongoose.Schema({
  Toppingname: {
    type: String,
    required: true,
  },
  ToppingCost: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  Type: {
    type: String,
    required: true,
  },

  ItemId: {
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

module.exports = Toppings = mongoose.model("toppings", ToppingsSchema);
