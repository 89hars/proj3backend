const router = require("express").Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const User = require("../models/User.model");
const Cart = require("../models/Cart.model");
const Product = require("../models/Product.models");
const Media = require("../models/Media.model");
const uploader = require("../middleware/cloudinary.config");
const multer = require("multer");

// Get all piece of art

router.get("/allproducts", async (req, res) => {
  try {
    const allArt = await Product.find().populate("media");
    res.status(200).json(allArt);
  } catch (error) {
    console.log(error);
  }
});

// Get one piece of art
router.get("/details/:artObjectId", async (req, res) => {
  try {
    const pieceOfArt = await Product.findById(req.params.artObjectId).populate(
      "media"
    );
    res.status(200).json(pieceOfArt);
  } catch (error) {
    console.log(error);
  }
});

// Route to search an art

router.get("/search/:keyword", async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await Product.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    }).select("-photo");
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
});

//To add a piece to cart
router.post("/cart/:artObjectId", isAuthenticated, async (req, res) => {
  try {
    const { artObjectId } = req.params;
    const userId = req.user.userId;
    const cart = await Cart.findOne({ user: userId });
    if (cart) {
      // If the cart already exists, find the item in the cart
      const item = cart.items.find(
        (item) => item.product.toString() === artObjectId
      );

      if (item) {
        // If the item already exists in the cart, increment the quantity
        item.quantity += 1;
      } else {
        // If the item doesn't exist in the cart, add it to the items array
        cart.items.push({ product: artObjectId });
      }

      await cart.save();
    } else {
      // If the cart doesn't exist, create a new cart and add the item
      const newCart = new Cart({
        user: userId,
        items: [{ product: artObjectId }],
      });

      await newCart.save();
    }

    res.status(201).json({ message: "Item added to cart successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to add item to cart" });
  }
});

module.exports = router;
