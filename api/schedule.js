const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Schedule = require("../models/Schedule");
const Menu = require("../models/Menu");
const ScheduleMenu = require("../models/ScheduleMenu");
const { check, validationResult } = require("express-validator");
const ScheduleItem = require("../models/ScheduleItem");
const Profile = require("../models/Profile");

// To Create New Schedule

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
        console.log(mine);
        // res.json(mine);

        if (mine) {
          res.json("Schedule already Exist");
          console.log("Schedule already Exist");
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

          const mineprofile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            {
              $set: {
                isSchedule: true,
              },
            }
          );
          console.log(mineprofile);
        }
      } catch (err) {
        res.status(500).json(err);
      }
    }
  }
);

router.get("/myschedule", auth, async (req, res) => {
  const mine = await Schedule.findOne({ user: req.user.id });
  console.log(mine);

  if (mine != null) {
    res.json(mine);
  } else {
    res.json("Your Schedule is not Existed");
  }
});

router.post("/addmenu", auth, async (req, res) => {
  const { Date, ItemId, ItemName, Quantity, Toppings, TypeofDish } = req.body;

  const schedule = await ScheduleMenu.find({
    $and: [{ user: req.user.id }, { Date: `${Date}` }],
  });
  console.log(schedule);
  // res.json(schedule);

  if (schedule.length >= 1) {
    const finditeminarray = await ScheduleMenu.find({
      Date: Date,

      user: req.user.id,

      ScheduleItems: {
        $elemMatch: {
          ItemId: ItemId,
          Toppings: Toppings,
          TypeofDish: TypeofDish,
        },
      },
    });

    console.log("Found Found Found");

    console.log(finditeminarray);
    console.log("Found Found Found");

    if (finditeminarray.length >= 1) {
      const findinarray1 = await ScheduleMenu.findOneAndUpdate(
        {
          Date: Date,
          // ItemId: ItemId,
          user: req.user.id,
          // "ScheduleItems.ItemId": ItemId,
          // "ScheduleItems.Toppings": Toppings,
          // "ScheduleItems.TypeofDish": TypeofDish,

          ScheduleItems: {
            $elemMatch: {
              ItemId: ItemId,
              Toppings: Toppings,
              TypeofDish: TypeofDish,
            },
          },

          // $and: [
          //   { "ScheduleItems.ItemId": ItemId },
          //   {
          //     ScheduleItems: {
          //       $elemMatch: { Toppings: Toppings, TypeofDish: TypeofDish },
          //     },
          //   },
          // ],
          // $and: [
          //   { "ScheduleItems.Toppings": { $all: Toppings } },
          //   { "ScheduleItems.TypeofDish": TypeofDish },
          // ],
          // "ScheduleItems.Toppings": { $all: Toppings },

          // $and: [
          //   {
          //     "ScheduleItems.Toppings": { $eq: Toppings },
          //     "ScheduleItems.TypeofDish": { $eq: TypeofDish },
          //   },
          // ],
          // ScheduleItems: {
          //   $elemMatch: { Toppings: Toppings, TypeofDish: TypeofDish },
          // },

          // "ScheduleItems.TypeofDish": TypeofDish,
        },

        { $inc: { "ScheduleItems.$.Quantity": 1 } }
      );
      // console.log("Found Found");
      console.log(findinarray1);
      // console.log("Found Found");
      res.json(findinarray1);
    } else {
      // res.json("You have to create new item");
      const scheduleitem = new ScheduleItem({
        ItemId: ItemId,
        ItemName: ItemName,
        Toppings: Toppings,
        TypeofDish: TypeofDish,
        Quantity: 1,
      });

      const savedItem = await scheduleitem.save();

      const schedule1 = await ScheduleMenu.findOneAndUpdate(
        {
          $and: [{ user: req.user.id }, { Date: `${Date}` }],
        },
        {
          $push: {
            ScheduleItems: [savedItem],
          },
        }
      );

      res.json(schedule1);

      console.log(schedule1);
    }
  } else {
    scheduleitems = { Date };
    scheduleitems.user = req.user.id;

    items = new ScheduleMenu(scheduleitems);
    await items.save();

    // res.json("Created Successfullyfff");

    const scheduleitem = new ScheduleItem({
      ItemId: ItemId,
      ItemName: ItemName,
      Toppings: Toppings,
      TypeofDish: TypeofDish,
      Quantity: Quantity,
    });

    const savedItem = await scheduleitem.save();

    const schedule1 = await ScheduleMenu.findOneAndUpdate(
      {
        $and: [{ user: req.user.id }, { Date: `${Date}` }],
      },
      {
        $push: {
          ScheduleItems: [savedItem],
        },
      }
    );

    res.json(schedule1);
    console.log(schedule1);
  }
});

router.post(
  "/scheduleitem/additems",
  [
    check("Date", "Must Include Date").not().isEmpty(),
    check("ItemId", "Must Include ItemId").not().isEmpty(),
  ],
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      const { Date, menuId, ItemId, ItemName, Quantity } = req.body;

      const schedule = await ScheduleMenu.findOne({
        $and: [{ user: req.user.id }, { Date: `${Date}` }],
      });

      // console.log(schedule);
      // res.json(schedule);

      const scheduleitem = new ScheduleItem({
        ItemId: ItemId,
        ItemName: ItemName,
        Quantity: Quantity,
      });

      // const findinarray = await ScheduleMenu.findOne(
      //   { ScheduleItems: { $elemMatch: { ItemId: ItemId } } }
      //   // { $set: { Quantity: "5" } }
      // );

      // console.log(findinarray);

      // if (findinarray) {
      // const findinarray = await ScheduleMenu.findOneAndUpdate(
      //   // {
      //   //   ScheduleItems: { $elemMatch: { ItemId: ItemId } },
      //   // }
      //   // {
      //   //   ScheduleItems: { $inc: { Quantity: "3" } },
      //   // }
      //   //   { $set:
      //   //     {
      //   //       "tags.1": "rain gear",
      //   //       "ratings.0.rating": 2
      //   //     }
      //   //  }

      //   // {
      //   //   $set: {
      //   //     "ScheduleItems.0.Quantity": 2,
      //   //   },
      //   // }
      // );

      // const findinarray1 = await ScheduleMenu.updateOne(
      //   {
      //     Date: Date,
      //     // ItemId: "12345687891",
      //     user: req.user.id,
      //     "ScheduleItems.ItemId": ItemId,
      //   },
      //   { $set: { "ScheduleItems.$.Quantity": Quantity } }
      //   // false,
      //   // true
      // );
      // console.log(findinarray1);

      // // console.log(findinarray);
      // res.json(findinarray1);
      // } else {
      console.log("Not Working");

      const savedItem = await scheduleitem.save();

      const schedule1 = await ScheduleMenu.findOneAndUpdate(
        {
          $and: [{ user: req.user.id }, { Date: `${Date}` }],
        },
        {
          $push: {
            ScheduleItems: [savedItem],
          },
        }
      );

      res.json(schedule1);
      console.log(schedule1);
      // }

      // if (schedule != null) {
      //   const scheduleitem = new ScheduleItem({
      //     ItemId: ItemId,
      //     ItemName: ItemName,
      //     Quantity: Quantity,
      //   });

      //   savedItem = await scheduleitem.save();

      //   const schedule = await ScheduleMenu.findOneAndUpdate(
      //     {
      //       $and: [{ user: req.user.id }, { Date: `${Date}` }],
      //     },
      //     {
      //       $addToSet: {
      //         ScheduleItems: [savedItem],
      //       },
      //     }
      //   );

      //   // res.json(schedule);
      // } else {
      //   // scheduleitems = { Date };
      //   // scheduleitems.user = req.user.id;

      //   // items = new ScheduleMenu(scheduleitems);
      //   // await items.save();

      //   const scheduleitem = new ScheduleItem({
      //     ItemId: ItemId,
      //     ItemName: ItemName,
      //     Quantity: Quantity,
      //   });

      //   savedItem = await scheduleitem.save();

      //   const schedule = await ScheduleMenu.findOneAndUpdate(
      //     {
      //       $and: [{ user: req.user.id }, { Date: `${Date}` }],
      //     },
      //     {
      //       $addToSet: {
      //         ScheduleItems: [savedItem],
      //       },
      //     }
      //   );

      //   // res.json(schedule);

      //   // res.json("Created Successfully");
      // }
    }
  }
);

//Response of user of particular Date
router.put("/menu/datemenu", auth, async (req, res) => {
  const { Date } = req.body;

  const schedule = await ScheduleMenu.findOne({
    $and: [{ user: req.user.id }, { Date: `${Date}` }],
  });

  res.send(schedule);
  console.log(schedule);
});
module.exports = router;
