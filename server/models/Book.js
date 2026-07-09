const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  author: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

 image: {
  type: String,
  default:
    "https://placehold.co/200x280?text=Book"
}

});

module.exports = mongoose.model(
  "Book",
  bookSchema
);