const router = require("express").Router()
const { isAuthenticated } = require("../middleware/jwt.middleware")
const User = require("../models/User.model")
const Cart = require("../models/Cart.model")
const Product = require("../models/Product.models")
const Media = require("../models/Media.model")
const uploader = require("../middleware/cloudinary.config")
const multer = require("multer")
const braintree = require('braintree')
const Order = require("../models/Order.model")

//payment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
})

// Route to create new user
router.get("/create", async (req, res, next) => {
  try {
    const newUser = await User.find()
    res.status(200).json(newUser)
  } catch (error) {
    console.log(error)
  }
})

// Get all piece of art

router.get("/allproducts", async (req, res) => {
  try {
    const allArt = await Product.find().populate("media")
   
    res.status(200).json(allArt)
  } catch (error) {
    console.log(error)
  }
})


// Get one piece of art
router.get("/details/:artObjectId", async (req, res) => {
  try {
    const pieceOfArt = await Product.findById(req.params.artObjectId).populate(
      "media"
    )
    res.status(200).json(pieceOfArt)
  } catch (error) {
    console.log(error)
  }
})

// Route to search an art

router.get("/search/:keyword", async (req, res) => {
  try {
    const { keyword } = req.params
    const results = await Product.find().select('-photo')
    const filteredResults = results.filter((product) => {
      const titleMatch = product.title.toLowerCase().includes(keyword.toLowerCase())
      const descriptionMatch = product.description.toLowerCase().includes(keyword.toLowerCase())
      return titleMatch || descriptionMatch
    })
    res.json(filteredResults)
  } catch (error) {
    console.log(error)
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    })
  }
})

//To add a piece to cart
router.post("/cart", isAuthenticated, async (req, res) => {
  try {
    const userId = req.auth.userId
    const { productId } = req.body
    await Cart.create({ userId, productId})
    res.status(200)
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

router.get("/cart", async (req, res) => {
  try {
    const allArt = await Cart.find()
    res.status(200).json(allArt)
  } catch (error) {
    console.log(error)
  }
})

router.get('/braintree/token', async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err)
      }
      else {
        res.send(response)
      }
    })
  } catch (error) {
    console.log(error)
  }
})

router.post('/braintree/payment', isAuthenticated, async (req, res) => {
  try {
    const { cart, nonce } = req.body
    let total = 0
    cart.map((i) => {
      total += i.price
    })
    let newTransaction = gateway.transaction.sale({
      amount: total,
      paymentMethodNonce: nonce,
      options: {
        submitForSettlement: true
      }
    },
      function (error, result) {
        if (result) {
          const order = new Order({ product: cart, payment: result, buyer: req.user._id }).save()
          res.json({ ok: true })

        }
        else {
          res.status(500).send(error)
        }
      }
    )
  } catch (error) {
    console.log(error)
  }
})
module.exports = router
