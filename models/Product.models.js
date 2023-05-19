const { Schema, model } = require("mongoose");

const productSchema = new mongoose.Schema({
  artist: {
    type: String,
    required: true
  },
  technic: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;






