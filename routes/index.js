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
  timeout_ms:           60*1000,
});
var geocoderProvider = 'google';
var httpAdapter = 'https';
var google_api = {
    apiKey: auth.google_api_key,
    formatter: null
};
var geocoder = require('node-geocoder')(geocoderProvider, httpAdapter, google_api);

// Stream all tweets
(function(){
  var stream = T.stream('statuses/sample');
  stream.on('tweet', function (tweet) {
    if (tweet.place && tweet.place.country_code === 'US'){

      var log = true;
      var stage = 0;

      var location;
      geocoder.geocode(tweet.place.full_name)
        .then(function(res){
          location = {
              latitude: res[0].latitude,
              longitude: res[0].longitude
            };
          stage = stage + 1;
          savePoint('Location');
        })
        .catch(function(err){
          console.log('Geocoding err:', err);
          log = false;
        });

      var political;
      indico.political(tweet.text)
        .then(function(res){ // { Libertarian: 0.47740164630834825, Liberal: 0.16617097211030055, Green: 0.08454409540443657, Conservative: 0.2718832861769146} 
          political = res;
          stage = stage + 1;
          savePoint('Political');
        })
        .catch(function(err){
          console.log('Indico err:', err);
          log = false;
        });

      var sentiment;
      indico.sentiment(tweet.text)
        .then(function(res){ // e.g., .312689
          sentiment = res;
          stage = stage + 1;
          savePoint('Sentiment');
        })
        .catch(function(err){
          console.log('Indico err:', err);
          log = false;
        });

      function savePoint(stageName){
        console.log(stageName + ' stage ' + stage);
        if(log && stage === 3){ //if no errors occured and other functions occurred, add to mongodb
          var point = new Points({
              text: tweet.text,
              sentiment: sentiment,
              polysentiment: political,
              location: location
          });

          point.save(function (err) {
            if (err) console.log('Err adding point:', err);
            else console.log('Added point: ' + 
              '\n\t{' + 
              '\n\t\ttext: ' + tweet.text +
              '\n\t\tsentiment: ' + sentiment +
              '\n\t\tpolysentiment: {Conservative: ' + political.Conservative + ' ...}' +
              '\n\t\tlocation: {latitude: ' + location.latitude + ' ...}' +
              '\n\t}'
            );
          });
        }
      }

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