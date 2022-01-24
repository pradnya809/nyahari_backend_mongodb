const mongoose = require("mongoose");

const ScheduleItemsSchema = new mongoose.Schema({
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
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = ScheduleItems = mongoose.model(
  "scheduleitems",
  ScheduleItemsSchema
);
