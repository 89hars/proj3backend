const { Schema, model, default: mongoose } = require("mongoose");

const productSchema = new Schema({
  artist: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  technic: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String, 
    required: false, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  media: {
    type: [mongoose.Types.ObjectId],
    ref: 'Media',
    required: true
  }
});

const Product = model("Product", productSchema);
module.exports = Product;
