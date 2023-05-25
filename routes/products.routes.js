const router = require("express").Router();
const Product = require("../models/Product.models");
const Media = require("../models/Media.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const uploader = require("../middleware/cloudinary.config");

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
  }
});

router.post(
  "/create",
  isAuthenticated,
  uploader.single("imageUrl"),
  async (req, res) => {
    try {
      const { title, technic, artist, price, description } = req.body;
      let link;
      if (req.file) {
        link = req.file.path;
      } else {
      }
      const newMedia = await Media.create({ link, type: "Image" });
      const productCreated = await Product.create({
        title,
        technic,
        artist,
        price,
        description,
        media: newMedia._id,
        createdBy: req.auth.userId,
      });
      res.status(201).json(productCreated);
    } catch (error) {
      console.log(error);
    }
  }
);

router.put("/:productId", async (req, res) => {
  const payload = req.body;
  const { productId } = req.params;
  try {
    const productUpdated = await Product.findByIdAndUpdate(productId, payload, {
      new: true,
    });
    res.status(200).json(productUpdated);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const response = await Product.findByIdAndRemove(productId);
    res.status(200).json(response);
  } catch (error) {
    console.log("error deleting product", error);
  }
});

router.get("/createdby/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const products = await Product.find({ createdBy: userId })
      .populate("createdBy")
      .populate("media");
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
