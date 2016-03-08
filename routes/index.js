/* Express router. Defines the server-side behavior of the various endpoints.
 Provides ability to GET all tweets, & POST to show either the pos/neg sentiment map or the political sentiment map*/
var express  = require('express');  // create our app w/ express
var mongoose = require('mongoose'); //mongoose databse to save tweets
var auth = require('../auth.js'); //api keys & authentication
var router = express.Router();                            
var Point = require('../models/pointModel.js')
var indico = require('indico.io'); //indico API for sentiment and political sentiment analysis
indico.apiKey =  auth.indico_api_key; //API key to access indico api

//TWIT
var Twit = require('twit')// Twitter API to sample tweets 
var T = new Twit({
  consumer_key: auth.consumer_key, //to access twitter api
  consumer_secret:  auth.consumer_secret,
  access_token:  auth.access_token,
  access_token_secret:  auth.access_token_secret,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

//  stream a sample of public statuses
//
var stream = T.stream('statuses/sample')
//stream.on('tweet', function (tweet) {
  //console.log(tweet)
//})
// filter the public stream by the latitude/longitude bounded box of San Francisco
//
//var sanFrancisco = [ '-122.75', '36.8', '-121.75', '37.8' ]
//var stream = T.stream('statuses/filter', { locations: sanFrancisco })
//stream.on('tweet', function (tweet) {
//  console.log(tweet)
//})
//ENDTWIT

//INDICO

//INDICO EXAMPLE
//indico
//  .political('Guns don\'t kill people. People kill people.')
//  .then(function(res){
//    console.log(res); // { Libertarian: 0.47740164630834825, Liberal: 0.16617097211030055, Green: 0.08454409540443657, Conservative: 0.2718832861769146} 
//  })
//  .catch(function(err){
//    console.log('err: ', err);
//  })

// routes ======================================================================


/*routes.GETtweets = function(req, res){
  console.log('index.js') 
    res.end();
};
routes.POSTpolitical = function(req, res){
    res.end();
};
routes.POSTemotional = function(req, res){
    res.end();
};*/


router.get('/sentiment', function(req, res) {
  Point.find({}, function(err, points) {
    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err) { 
      console.log('Error!');
      res.send(err) 
    }
    console.log('router.get/sentiment')
    res.json(points); // return all todos in JSON format
  });
});

router.get('/political', function(req, res) {
  Point.find({}, function(err, points) {
    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err) { 
      console.log('Error!');
      res.send(err) 
    }
    console.log('router.get/political')
    res.json(points); // return all todos in JSON format
  });
});


router.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

module.exports=router;


