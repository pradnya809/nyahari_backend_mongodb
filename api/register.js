const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");
const Profile = require("../models/Profile");

router.post(
  "/",
  [
    check("name", "Must Include Name").not().isEmpty(),
    check("email", "Must Include Valid Email").isEmail(),
    check("password", "Must password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      const { name, email, password } = req.body;

      try {
        let user = await User.findOne({ email });
        if (user) {
          res.status(400).json({ errors: [{ msg: "User already Exist" }] });
        }

        user = new User({
          name,
          email,
          password,
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        profileFields = { name, email };
        profileFields.user = user.id;

        profile = new Profile(profileFields);
        await profile.save();

        const payload = {
          user: {
            id: user.id,
          },
        };

        jwt.sign(
          payload,
          config.jwtSecret,
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
            // res.json({ email, password });
          }
        );

        //   res.send("Registered Successfully");
      } catch (err) {
        //   res.send(err);
        console.log(err.message);
      }
    }
  }
);

module.exports = router;
