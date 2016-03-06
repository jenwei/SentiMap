var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
  title: String,
  url: String,
  body: String,
  timestamp: Date,
  author: String,
  imagesource: String,
  tags: Array
})

module.exports = mongoose.model("Post", postSchema);
