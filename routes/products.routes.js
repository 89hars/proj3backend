const router = require("express").Router()
const Product = require("../models/Product.models")
const { isAuthenticated } = require('../middleware/jwt.middleware')

router.post("/delete"), async (req, res) => {
  try {
    // const { productId } = req.params
    // const response = await Product.findByIdAndRemove(productId)
    res.status(200)
  }
  catch (error) { console.log("error deleting product", error) }
}

router.get("/", async (req, res) => {
  try {
    const products = await Product.find()
    res.status(200).json(products)
  } catch (error) {
    console.log(error)
  }
})

router.post("/create", isAuthenticated, async (req, res) => {
  let payload = req.body
  payload = { ...payload, createdBy: req.auth.userId }
  try {
    const productCreated = await Product.create(payload)
    res.status(201).json(productCreated)
  } catch (error) {
    console.log(error)
  }
})

router.post("/edit/:productId", async (req, res) => {
  const payload = req.body
  console.log(payload)
  const { productId } = req.params
  try {
    const productUpdated = await Product.findByIdAndUpdate(productId, payload, { new: true })
    console.log(productUpdated)
    res.status(200).json(productUpdated)
  } catch (error) {
    console.log(error)
  }
})

router.delete("/:productId", async (req, res) => {
  try {
    const { productId } = req.params
    const response = await Product.findByIdAndRemove(productId)
    res.status(200).json(response)
  }
  catch (error) { console.log("error deleting product", error) }
})


router.get("/createdby/:userId", async (req, res) => {
  const { userId } = req.params
  console.log(userId)
  try {
    const products = await Product.find({ createdBy: userId }).populate('createdBy')
    res.status(200).json(products)
  } catch (error) {
    console.log(error)
  }
})



module.exports = router
