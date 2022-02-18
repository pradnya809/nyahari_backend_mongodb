const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    unique: true,
  },

  address: {
    type: String,
    default: "",
    required: true,
  },
  streetaddress: {
    type: String,
    default: "",
    required: true,
  },

  apartment: {
    type: String,
    default: "",
  },

  time: {
    type: String,
    default: "",
    required: true,
  },
  phone: {
    type: String,
    default: "",
    required: true,
  },
  startDate: {
    type: String,
    default: "",
    required: true,
  },
  endDate: {
    type: String,
    default: "",
    required: true,
  },
  // Schedule: {
  //   type: Array,
  // },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Schedule = mongoose.model("schedule", ScheduleSchema);
