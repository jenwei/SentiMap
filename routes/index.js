/*
  index.js: Express router. Defines the server-side behavior.
*/

var routes = {};
var express  = require('express');
var mongoose = require('mongoose'); 
var auth = require('../auth.js');
var Twit = require('twit');
var indico = require('indico.io');
indico.apiKey =  auth.indico_api_key;

//TWIT
var Twit = require('twit')
var T = new Twit({
  consumer_key:         auth.consumer_key,
  consumer_secret:      auth.consumer_secret,
  access_token:         auth.access_token,
  access_token_secret:  auth.access_token_secret,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
});

//INDICO
indico
  .political('Guns don\'t kill people. People kill people.')
  .then(function(res){
    console.log(res); // { Libertarian: 0.47740164630834825, Liberal: 0.16617097211030055, Green: 0.08454409540443657, Conservative: 0.2718832861769146} 
  })
  .catch(function(err){
    console.log('err: ', err);
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