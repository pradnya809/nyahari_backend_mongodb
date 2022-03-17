const mongoose = require("mongoose");

const ScheduleMenuSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  Date: {
    type: String,
    default: "",
  },
  ScheduleItems: {
    type: Array,
  },
  cost: {
    type: Number,
    // required: true,
  },
  ToppingCost: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = ScheduleMenu = mongoose.model(
  // "scheduleitems",
  "schedulemenu",
  ScheduleMenuSchema
);
