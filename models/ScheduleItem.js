const mongoose = require("mongoose");

const ScheduleItemSchema = new mongoose.Schema({
  //   user: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "user",
  //   },
  ItemId: {
    type: String,
    default: "",
  },
  ItemName: {
    type: String,
    default: "",
  },
  Quantity: {
    type: Number,
    default: 0,
  },
  Toppings: {
    type: String,
    // default: [],
    default: "",
  },
  TypeofDish: {
    type: String,
    default: "",
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = ScheduleItem = mongoose.model(
  "scheduleitem",
  ScheduleItemSchema
);
