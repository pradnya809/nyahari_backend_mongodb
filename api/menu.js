const express = require("express");
const router = express.Router();
const Menu = require("../models/Menu");
const config = require("config");
const { json } = require("express/lib/response");
const auth = require("../middleware/auth");

router.post("/", async (req, res) => {
  console.log(req.body);

  const {
    name,
    category,
    cost,
    description,
    deliveryTime,
    Ratings,
    quantity,
    image,
  } = req.body;

  try {
    //   res.send(user);
    menu = new Menu({
      name,
      category,
      cost,
      description,
      deliveryTime,
      Ratings,
      quantity,
      image,
    });

    await menu.save();
    res.json("Saved Successfully");
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/", async (req, res) => {
  let menu = await Menu.find();
  res.json(menu);
  console.log(menu);
});

//For delete item in array

router.post("/deletemenu", auth, async (req, res) => {
  const { Date, ItemId, Toppings, TypeofDish } = req.body;

  const findinarray1 = await ScheduleMenu.findOneAndUpdate(
    {
      Date: Date,
      user: req.user.id,
    },
    {
      $pull: {
        ScheduleItems: {
          ItemId: ItemId,
          Toppings: Toppings,
          TypeofDish: TypeofDish,
        },
      },
    }
  );

  console.log("Found Found Found");
  console.log(findinarray1);
  res.json(findinarray1);
  console.log("Found Found Found");
});

//For Adding Item in array
router.post("/addmenu", auth, async (req, res) => {
  const {
    Date,
    ItemId,
    ItemName,
    Quantity,
    Toppings,
    TypeofDish,
    cost,
    ToppingCost,
  } = req.body;

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
          user: req.user.id,
          ScheduleItems: {
            $elemMatch: {
              ItemId: ItemId,
              Toppings: Toppings,
              TypeofDish: TypeofDish,
            },
          },
        },

        { $inc: { "ScheduleItems.$.Quantity": 1 } }
      );
      // console.log("Found Found");
      console.log(findinarray1);
      // console.log("Found Found");
      res.json(findinarray1);
    } else {
      // res.json("You have to create new item");
      let TotalCost = cost + ToppingCost;

      const scheduleitem = new ScheduleItem({
        ItemId: ItemId,
        ItemName: ItemName,
        Toppings: Toppings,
        TypeofDish: TypeofDish,
        Quantity: 1,
        cost: cost,
        ToppingCost: ToppingCost,
        TotalCost: TotalCost,
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
    let TotalCost = cost + ToppingCost;

    const scheduleitem = new ScheduleItem({
      ItemId: ItemId,
      ItemName: ItemName,
      Toppings: Toppings,
      TypeofDish: TypeofDish,
      Quantity: Quantity,
      cost: cost,
      ToppingCost: ToppingCost,
      TotalCost: TotalCost,
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

router.post("/removemenu", auth, async (req, res) => {
  const { Date, ItemId, Toppings, TypeofDish } = req.body;

  const findinarray1 = await ScheduleMenu.findOne(
    {
      Date: Date,
      user: req.user.id,

      ScheduleItems: {
        $elemMatch: {
          ItemId: ItemId,
          Toppings: Toppings,
          TypeofDish: TypeofDish,
          Quantity: 1,
        },
      },
    }

    // { $inc: { "ScheduleItems.$.Quantity": -1 } }
  );

  if (findinarray1) {
    const findinarray1 = await ScheduleMenu.findOneAndUpdate(
      {
        Date: Date,
        user: req.user.id,
      },
      {
        $pull: {
          ScheduleItems: {
            ItemId: ItemId,
            Toppings: Toppings,
            TypeofDish: TypeofDish,
          },
        },
      }
    );

    res.send("Item Removed Completely");
  } else {
    const findinarray2 = await ScheduleMenu.findOneAndUpdate(
      {
        Date: Date,
        user: req.user.id,

        ScheduleItems: {
          $elemMatch: {
            ItemId: ItemId,
            Toppings: Toppings,
            TypeofDish: TypeofDish,
          },
        },
      },

      { $inc: { "ScheduleItems.$.Quantity": -1 } }
    );
    res.send(findinarray2);
  }
});

//For Showing menu of particular Date

router.put("/showmenu", auth, async (req, res) => {
  const { Date } = req.body;

  const schedule = await ScheduleMenu.findOne({
    $and: [{ user: req.user.id }, { Date: `${Date}` }],
  });
  console.log(schedule);
  res.json(schedule);
});

module.exports = router;
