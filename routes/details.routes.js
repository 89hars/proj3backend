const router = require("express").Router();
const User = require("../models/User.model");


// Route to create new user
router.get("/", async (req, res, next) => {
  try {
    const newUser = await User.find();
    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
  }
});

// Get one piece of art

router.get("/:artObjectId", async (req, res) => {
  try {
    const pieceOfArt = await PieceOfArt.findById(req.params.artObjectId);
    res.status(200).json(pieceOfArt);
  } catch (error) {
    console.log(error);
  }
});

// Create one piece a new piece art

router.post("/details", async (req, res) => {
  const payload = /*req.body*/ trySomething;
  try {
    const newPieceOfArt = await NewPieceOfArt.create(payload);
    res.status(201).json(newPieceOfArt);
  } catch (error) {
    console.log(error);
  }
});

// Edit a piece of art

router.put("/:artObjectId", async (req, res) => {
  const { artObjectId } = req.params;
  const payload = req.body;
  try {
    const updateArt = await PieceOfArt.findByIdAndUpdate(recipeId, payload, {
      new: true,
    }); //update to model
    res.status(200).json(updateArt);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:artObjectId", async (req, res) => {
  try {
    await PieceOfArt.findByIdAndDelete(req.params.artObjectId);
    res.status(200).json({ message: "Artwork succesfully deleted" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
