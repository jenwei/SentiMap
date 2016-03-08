/*
  index.js: Express router. Defines the server-side behavior.
*/

var express  = require('express');
var mongoose = require('mongoose'); 
var auth = require('../auth.js');
var Twit = require('twit');
var routes = {};

var T = new Twit({
  consumer_key:         auth.consumer_key,
  consumer_secret:      auth.consumer_secret,
  access_token:         auth.access_token,
  access_token_secret:  auth.access_token_secret,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
});


routes.home = function(req, res){
  //res.render('index.html')
  console.log('Test')
  res.send('Test');
};

routes.GETtweets = function(req, res){
  var stream = T.stream('statuses/sample');
  stream.on('tweet', function (tweet) {
    if (tweet.place && tweet.place.country_code === 'US'){
      console.log('\n', tweet.place.full_name);
      console.log(tweet.text);
    }
  });
  res.send({message: 'getting all tweets'});
};

routes.POSTpolitical = function(req, res){
    res.end();
};

routes.POSTemotional = function(req, res){
    res.end();
};

module.exports=routes;