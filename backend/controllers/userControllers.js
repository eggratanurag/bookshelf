const asyncHandler = require("express-async-handler");
const User = require("../db/User.js");
const generateToken = require("../db/generateToken.js");

;
// const registerUser = require('../controllers/userControllers.js');

const allUsers = asyncHandler(async (req, res) => {
  const user = await User.findOne({_id: req.params.id });
  console.log(user.mob, user.address)
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      likes: user.likes,
      orders: user.orders,
      mob: user.mob,
      state: user.state,
      address: user.address,
    });
  } else {
    throw new Error("cannot fetch user info");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic, address,mob, state} = req.body;
  console.log("register body", req.body);

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
    address,
    mob, 
    state
  });
  console.log(user)
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email: { $regex: email, $options: "i" },
  });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});



module.exports = { allUsers, registerUser, authUser  };
