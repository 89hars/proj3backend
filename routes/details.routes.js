const router = require("express").Router();
const { isAuthenticated } = require('../middleware/jwt.middleware');
const User = require("../models/User.model");
const Cart = require("../models/Cart.model");
const Product = require("../models/Product.models");

// Route to create new user
router.get("/create", async (req, res, next) => {
  try {
    const newUser = await User.find();
    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
  }
});

// Get all piece of art

router.get("/allproducts", async (req, res) => {
  try {
    const allArt = await Product.find();
    res.status(200).json(allArt);
  } catch (error) {
    console.log(error);
  }
});

// Get one piece of art

router.get("/details/:artObjectId", async (req, res) => {
  try {
    const pieceOfArt = await Product.findById(req.params.artObjectId);
    res.status(200).json(pieceOfArt);
  } catch (error) {
    console.log(error);
  }
});



// Create one piece a new piece art

router.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const newPieceOfArt = await Product.create(payload);
    res.status(201).json(newPieceOfArt);
  } catch (error) {
    console.log(error);
  }
});

// Edit a piece

router.put("/:artObjectId", async (req, res) => {
  const { artObjectId } = req.params;
  const payload = req.body;
  try {
    const updateArt = await Product.findByIdAndUpdate(artObjectId, payload, {
      new: true,
    }); //update to model
    res.status(200).json(updateArt);
  } catch (error) {
    console.log(error);
  }
});

// Delete a piece
router.delete("/:artObjectId", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.artObjectId);
    res.status(200).json({ message: "Artwork succesfully deleted" });
  } catch (error) {
    console.log(error);
  }
});

// Route to search an art

router.get('/search/:keyword', async (req, res) => {
  try {
    const { keyword } = req.params
    const results = await Product.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ]
    }).select('-photo')
    res.json(results)
  } catch (error) {
    console.log(error)
    res.status(400).send({
      success: false,
      message: 'Error In Search Product API',
      error,
    })

  }

})

//To add a piece to cart
router.post("/cart", async (req, res) => {
  console.log(req.body)
  try {
    const { userId, productId, quantity, price } = req.body;
    const product = await Product.findById(productId);
    const user = await User.findById(userId);

    const cartItem = {
      product: product._id,
      quantity: quantity,
      price: price,
    };


    let cart = await Cart.findOne({ user: user._id });
    console.log(cart, user)
    if (!cart) {
      cart = new Cart({ user: user._id, items: [cartItem] });
    } else {
      cart.items.push(cartItem);
    }

    await cart.save();

    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get("/cart", async (req, res) => {
  try {
    const allArt = await Cart.find();
    res.status(200).json(allArt);
  } catch (error) {
    console.log(error);
  }
});



module.exports = router;
