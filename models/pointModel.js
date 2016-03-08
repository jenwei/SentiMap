/* Defines a MongoDB model for a "point" object. A point has
text(the body of the tweet), sentiment(positive/negative sentiment), polysentiment(political sentiment)
and location (the city the tweet was posted from)*/
var mongoose = require('mongoose');   

// define model =================
var pointSchema = mongoose.Schema({
  text : String,
  sentiment: String,
  polysentiment: String,
  x: Number,
  y: Number,
  
});

module.exports = mongoose.model("point", pointSchema); 