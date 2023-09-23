
const express = require('express');
const asyncHandler = require("express-async-handler");
const Product = require('../db/product.js')
const router = express.Router();

router.route('/addBooks')
.post(
  asyncHandler(async (req, res) => {
    
    // console.log("from books route",req.body)
      const newProduct = req.body;
    
      
      const product = await Product.create(
          newProduct
      );
    
      if (product) {
        res.status(201).json({
            product
        //   token: generateToken(user._id),
        });
      } else {
        res.status(400);
        throw new Error("User not found");
       
      }
    })
)
router.route("/buyBooks")
.get(
  asyncHandler(async (req, res) => {
    
    const products = await Product.find();
  
    if (products.length > 0) {
      res.status(201).json({
          products
      //   token: generateToken(user._id),
      });
    }else {
      res.status(201).json({products: [{result: "no product found"}]})
    }
  })
)


router.route('/buyBooks/:id')
.get(
  asyncHandler(async (req, res) => {
    
      const products = await Product.find({userId: {$ne: req.params.id}});
   
      if (products.length > 0) {
        res.status(201).json({
            products
        //   token: generateToken(user._id),
        });
      }else {
        res.status(201).json({products: [{result: "no product found"}]})
      }
    })
)


router.route('/sellBooks/:id')
.get(
  asyncHandler(async (req, res) => {
    
      const products = await Product.find({userId: req.params.id});
  
      if (products.length > 0)  {
        res.status(201).json({
            products
        //   token: generateToken(user._id),
        });
      } else {
        res.status(201).json({products: [{result: "no product found"}]})
      }
    })
)


router.route('/updateBook/:bookId')
.delete(
  asyncHandler(async (req, res) => {
    
    // console.log("from books route",req.params.bookId)
    const removingProduct = await Product.deleteOne({_id: req.params.bookId});

  if (removingProduct) {
    res.status(201).json(
      removingProduct
    //   token: generateToken(user._id),
   );
  } else {
    res.status(400);
    throw new Error("cannot remove book");
   
  }
    
    })
)
.get(
  asyncHandler(async (req, res) => {
    
    const product = await Product.findOne({_id: req.params.bookId});
  
    if (product)  {
      res.status(201).json(
        product
      )
    } else  {
      res.status(400);
      throw new Error("cannot find book with this info")
    }
  })
)
.put(
  asyncHandler(async (req, res) => {
    const updatedProduct = req.body;
    

    
    const product = await Product.updateOne(
      {_id: req.params.bookId},
      {$set: updatedProduct}
      );

    if (product)  {
    res.status(201).json(
        product
      )
    } else  {
      res.status(400);
      throw new Error("cannot find book with this info")
    }
  })
)

router.route("/searchBooks/:key")
.get(
  asyncHandler(async (req,res) => {
    let result = await Product.find({
          "$or":[
            {
              name:{"$regex": req.params.key, $options: 'i'}
            },
      
            {
              brand:{"$regex": req.params.key, $options: 'i'}
            }
          ]
        });
       if(result) {
        res.status(201).json(result)
       }else {
        res.status(201);
        throw new Error ("no book found")
       }
  })
)




module.exports = router;