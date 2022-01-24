const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Schedule = require("../models/Schedule");
const Menu = require("../models/Menu");
const ScheduleMenu = require("../models/ScheduleMenu");
const { check, validationResult } = require("express-validator");

router.post(
  "/",
  [
    check("address", "Must Include startDate").not().isEmpty(),
    check("streetaddress", "Must Include startDate").not().isEmpty(),
    check("time", "Must Include Time of Delivery").not().isEmpty(),
    check("phone", "Must Include phone number").not().isEmpty(),
    check("startDate", "Must Include startDate").not().isEmpty(),
    check("endDate", "Must Include endDate").not().isEmpty(),
  ],
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      try {
        const mine = await Schedule.findOne({ user: req.user.id });
        // console.log(mine);
        // res.json(mine);

        if (mine) {
          res.json("Schedule already Exist");
        } else {
          const { address, streetaddress, time, phone, startDate, endDate } =
            req.body;

          scheduleFields = {
            address,
            streetaddress,
            time,
            phone,
            startDate,
            endDate,
          };
          scheduleFields.user = req.user.id;

          schedule = new Schedule(scheduleFields);
          await schedule.save();

          res.json("Schedule Saved");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    }
  }
);

router.post("/addmenu", auth, async (req, res) => {
  const { Date } = req.body;

  const schedule = await ScheduleMenu.find({
    $and: [{ user: req.user.id }, { Date: `${Date}` }],
  });
  console.log(schedule);
  // res.json(schedule);

  if (schedule.length >= 1) {
    res.json("Already Present");
  } else {
    scheduleitems = { Date };
    scheduleitems.user = req.user.id;

    items = new ScheduleMenu(scheduleitems);
    await items.save();

    res.json("Created Successfully");
  }
});

router.post(
  "/scheduleitem/additems",
  [
    check("Date", "Must Include Date").not().isEmpty(),
    check("menuId", "Must Include menuId").not().isEmpty(),
  ],
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      const { Date, menuId } = req.body;
      const schedule = await ScheduleMenu.findOneAndUpdate(
        {
          $and: [{ user: req.user.id }, { Date: `${Date}` }],
        },
        {
          $addToSet: {
            ScheduleItems: [menuId],
          },
        }
      );

      res.json(schedule);
    }
  }
);

router.get("/testitem/testarray", auth, async (req, res) => {
  const { Date } = req.body;

  const schedule = await Schedule.find(
    {
      user: req.user.id,
    }
    // { schedule: { $elemMatch: { Date: "12/01/2022" } } }
  );

  //   const schedule = await Schedule.find({
  //     $and: [{ user: req.user.id }, { Date: `${Date}` }],
  //   });

  res.json(schedule);
});
module.exports = router;
