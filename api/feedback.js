const express = require("express");
const Feedback = require("../models/Feedback");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  try {
    const mine = await Profile.findOne({ user: req.user.id });
    console.log(mine);
    res.json(mine);
    console.log("I am Feedback");

    // feedback = new Feedback({
    //     email,
    //     password,
    //   });

    // await user.save();
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
