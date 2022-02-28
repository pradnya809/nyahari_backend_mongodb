const mongoose = require("mongoose");

const FeedbackWebSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  feedbackmessage: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = FeedbackWeb = mongoose.model("feedbackweb", FeedbackWebSchema);
