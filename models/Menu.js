const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  category: {
    type: String,
  },
  keyword: {
    type: String,
  },
  cost: {
    type: String,
  },
  description: {
    type: String,
  },
  deliveryTime: {
    type: String,
  },
  Ratings: {
    type: Array,
  },
  Toppings: {
    type: String,
  },
  TypeofDish: {
    type: String,
  },
  quantity: {
    type: String,
  },
  image: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Menu = mongoose.model("menu", MenuSchema);
