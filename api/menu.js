const express = require("express");
const router = express.Router();
const Menu = require("../models/Menu");
const config = require("config");
const { json } = require("express/lib/response");

//@route api/users
//@desc Auth route
//@access Public

// router.get("/", auth, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select("-password");
//     res.json(user);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

//@route api/auth
//@desc Authenticate User
//@access Public

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

// router.get("/",async(req,res)=>{

// })

module.exports = router;
