/*
  index.js: Express router. Defines the server-side behavior.
*/

var routes = {};
var express  = require('express');
var mongoose = require('mongoose'); 
var Points = require('../models/pointModel.js');
var auth = require('../auth.js');
var Twit = require('twit');
var indico = require('indico.io');
indico.apiKey =  auth.indico_api_key;
var Twit = require('twit')
var T = new Twit({
  consumer_key:         auth.consumer_key,
  consumer_secret:      auth.consumer_secret,
  access_token:         auth.access_token,
  access_token_secret:  auth.access_token_secret,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
});

// Stream all tweets
(function(){
  var stream = T.stream('statuses/sample');
  stream.on('tweet', function (tweet) {
    if (tweet.place && tweet.place.country_code === 'US'){
      
      var political;
      indico
        .political(tweet.text)
        .then(function(res){
          console.log(res); // { Libertarian: 0.47740164630834825, Liberal: 0.16617097211030055, Green: 0.08454409540443657, Conservative: 0.2718832861769146} 
          political = res;
        })
        .catch(function(err){ console.log('Indico err:', err); });

      var sentiment;
      indico
        .sentiment(tweet.text)
        .then(function(res){
          console.log(res);
          sentiment = res;
        })
        .catch(function(err){ console.log('Indico err:', err); });

      var point = new Points({
          text : tweet.text,
          sentiment: sentiment,
          polysentiment: political,
          location: tweet.place.full_name
      });

      point.save(function (err) {
        if (err) console.log('Err adding point:', err);
        else console.log('Added point:', point);
      });
    }
  });
})();


// ROUTES
routes.home = function(req, res){
  res.sendfile('./public/index.html');
};

routes.GETsentiment = function(req, res){
   Points.find({}, function(err, points) {
    if (err) { 
      console.log('Error!');
      res.send(err);
    }
    res.json(points);
  });
};

routes.GETpolitical = function(req, res){
  Points.find({}, function(err, points) {
    if (err) { 
      console.log('Error!');
      res.send(err);
    }
    res.json(points);
  });
};

module.exports=routes;