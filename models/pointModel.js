/* 
	pointModel.js: Defines a MongoDB model for a "point" object. A point has
	text(the body of the tweet), sentiment(positive/negative sentiment), 
	polysentiment(political sentiment) and location (the city the tweet 
	was posted from)
*/

var mongoose = require('mongoose');   

var pointSchema = mongoose.Schema({
	text: String,
	sentiment: Number,
	polysentiment: Object,
	location: Object
});

/*
	{
		text: 'This is a tweet.'
		sentiment: .093224324
	    polysentiment: 
	    	{   Libertarian: 0.47740164630834825, 
				Liberal: 0.16617097211030055, 
				Green: 0.08454409540443657, 
				Conservative: 0.2718832861769146 } 
	    location: 
	    	{   latitude: 48.8698679
	    		longitude: 2.3072976 }
	}
*/

module.exports = mongoose.model('point', pointSchema); 
