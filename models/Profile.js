const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    // required: true,
  },
  avatar: {
    type: String,
  },
  Orders: {
    type: Array,
  },
  Notifications: {
    type: Array,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
