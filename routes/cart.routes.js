const router = require("express").Router()
const Cart = require("../models/Cart.model")
const Order = require("../models/Order.model")
const { isAuthenticated } = require('../middleware/jwt.middleware')

router.post("/", isAuthenticated, async (req, res) => {
    try {
        const userId = req.auth.userId
        const { productId } = req.body
        await Cart.create({ user: userId, product: productId })
        res.status(200)
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
})

router.get("/", isAuthenticated, async (req, res) => {
    try {
        const userId = req.auth.userId
        const carts = await Cart.find({ user: userId }).populate({
            path: 'product',
            populate: {
                path: 'media'
            }
        })


        res.status(200).json(carts)
    } catch (error) {
        console.log(error)
    }
})

router.get("/purchasedby/:userId", async (req, res) => {
    const { userId } = req.params
    try {
        const productPurchased = await Order
            .find({ buyer: userId })
            .populate({
                path: 'product',
                populate: {
                    path: 'media'
                }
            })
            .populate('buyer')
        res.status(200).json(productPurchased)

    }
    catch (error) {
        console.log("error getting the product purchased", error)
    }
})

router.delete("/:cartId", async (req, res) => {
    try {
        const { cartId } = req.params
        const response = await Cart.findByIdAndRemove(cartId)
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
})

router.delete("/", isAuthenticated, async (req, res) => {
    try {
        const userId = req.auth.userId
        console.log(products)
        consle.log("ca marche")
        res.status(200).json(products)
        const response = await Cart.deleteMany({ user: userId })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
})


module.exports = router
