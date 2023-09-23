const express = require("express");
const asyncHandler = require("express-async-handler");
const User = require('../db/User.js')
const router = express.Router();
const Product = require('../db/product.js')
const {
  registerUser,
  authUser,
  allUsers,

} = require("../controllers/userControllers");
// const { listenerCount } = require("../db/product.js");
const  {protect}  = require("../middleware/authMiddleware");



router.route("/:id").get(protect, allUsers);
router.route("/").post(registerUser);
router.route("/login").post(authUser);

// router.get('/faltu',(req, res) => {
//   res.send("this is a faltu route")
// });
// router.post("/google", authUser);




router.get('/seller/:id',
asyncHandler(async (req, res) => {
  const user = await User.findOne({_id: req.params.id });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      mob: user.mob,
      state: user.state,
      address: user.address,
    });
  } else {
    throw new Error("cannot fetch user info");
  }
})
)

router.route('/updateUser/:userId')
.put(
  asyncHandler(async (req,res) => {

  const result = await User.updateMany(
    {_id: req.params.userId},
    { $set:
      {
         pic:req.body.pic,
         state:req.body.state,
         address:req.body.address,
         mob:req.body.mob,
      }
    }

    
    )
    if (result)  {
      const updatedUser = await User.findOne({_id: req.params.userId})
      res.status(201).json(
      
       updatedUser
      )
    } else  {
      res.status(400);
      throw new Error("cannot like this book")
    }
})

)



router.put('/updateUser/feed/:userId/:bookId',
asyncHandler(async (req, res) => {

   const user = await User.findOne({_id: req.params.userId})
  //   console.log("calling update user")
  // console.log("userId", req.params.userId)
  // console.log("bookId", req.params.bookId)
 
  const list = req.headers.list;
  const action = req.headers.action;
  // console.log("action", action)
  // console.log("list", list)

  function definer () {
    return list === "wishlist" && action === "add" ? {$push: {likes: req.params.bookId}}
           :list === "wishlist" && action === "remove" ? {$pull: {likes: req.params.bookId}}
           :list === "orders" && action === "add" ? {$push: {orders: req.params.bookId}}
           :{$pull: {orders: req.params.bookId}}
  }
  const valueAssigner = definer();
  console.log(valueAssigner)
        const result = await User.updateOne(
        {_id: req.params.userId},
        valueAssigner
        )
        if (result)  {
          const updatedUser = await User.findOne({_id: req.params.userId})
          res.status(201).json(
           
            updatedUser
          )
        } else  {
          res.status(400);
          throw new Error("cannot like this book")
        }

})
)

module.exports = router;