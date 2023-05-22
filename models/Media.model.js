const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const mediaSchema = new Schema({
  link: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Image"],
    required: true,
  },
});

const Media = model("Media", mediaSchema);

module.exports = Media;
