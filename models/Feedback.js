const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
  },
  message: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Feedback = mongoose.model("feedback", FeedbackSchema);
