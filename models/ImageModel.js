const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var ImageSchema = new Schema({
  imageData: {
    type: String,
  },
});

var Image = mongoose.model("Image", ImageSchema);

module.exports = Image;
