const { Schema, model, default: mongoose } = require("mongoose");

const orderSchema = new Schema({
    products: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Product",
        },

    ],
    payment: {},
    buyer: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
});
const Order = model("Order", orderSchema);
module.exports = Order;
