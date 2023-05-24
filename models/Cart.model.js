const { Schema, model, default: mongoose } = require("mongoose")

const cartSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Cart = mongoose.model("Cart", cartSchema)

module.exports = Cart
