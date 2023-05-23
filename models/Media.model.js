const { Schema, model } = require("mongoose");

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
