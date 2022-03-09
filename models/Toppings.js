const mongoose = require("mongoose");

const ToppingsSchema = new mongoose.Schema({
  Toppingname: {
    type: String,
  },
  ExtraCharge: {
    type: String,
  },
  category: {
    type: String,
  },
  Type: {
    type: String,
  },
  nameofdish: {
    type: String,
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
