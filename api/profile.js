const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/me", auth, async (req, res) => {
  try {
    const mine = await Profile.findOne({ user: req.user.id });
    console.log(mine);
    res.json(mine);
    // const User1 = await Profile.find();
    // res.status(200).json(User1);
    // const user = await User.findById(req.user.id).select("-password");
  } catch (err) {
    res.status(500).json(err);
    // console.log(err);
  }
});

module.exports = router;
