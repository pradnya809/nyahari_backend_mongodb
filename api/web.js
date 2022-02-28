const express = require("express");
const FeedbackWeb = require("../models/FeedbackWeb");
const ContactWeb = require("../models/ContactWeb");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    res.json("Hello from Web");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/feedbackweb", async (req, res) => {
  try {
    const { email, feedbackmessage } = req.body;
    feedbackweb = new FeedbackWeb({
      email,
      feedbackmessage,
    });

    await feedbackweb.save();

    res.json("Test Pass");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/contactweb", async (req, res) => {
  try {
    const { firstname, lastname, email, phone, message } = req.body;
    contactweb = new ContactWeb({
      firstname,
      lastname,
      email,
      phone,
      message,
    });

    await contactweb.save();

    res.json("Test Pass By Contact");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
