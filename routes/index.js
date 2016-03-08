/* Express router. Defines the server-side behavior of the various endpoints.
 Provides ability to GET all pages, POST a new page, and POST edits to a given page.*/
var express  = require('express');
//var router = express.Router();                             // create our app w/ express
var mongoose = require('mongoose'); 
var auth = require('../auth.js')
var routes = {};
var indico = require('indico.io');
indico.apiKey =  auth.indico_api_key;
//TWIT
var Twit = require('twit')
var T = new Twit({
  consumer_key: auth.consumer_key,
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
var sanFrancisco = [ '-122.75', '36.8', '-121.75', '37.8' ]
var stream = T.stream('statuses/filter', { locations: sanFrancisco })
//stream.on('tweet', function (tweet) {
//  console.log(tweet)
//})
//ENDTWIT
//INDICO
//INDICO EXAMPLE

indico
  .political('Guns don\'t kill people. People kill people.')
  .then(function(res){
    console.log(res); // { Libertarian: 0.47740164630834825, Liberal: 0.16617097211030055, Green: 0.08454409540443657, Conservative: 0.2718832861769146} 
  })
  .catch(function(err){
    console.log('err: ', err);
  })

// routes ======================================================================



routes.home = function(req, res){
  //res.render('index.html')
  console.log('Test')
  res.send('Test');
};


routes.GETtweets = function(req, res){
  console.log('index.js') 
    res.end();
};

routes.POSTpolitical = function(req, res){
    res.end();
};

routes.POSTemotional = function(req, res){
    res.end();
};



module.exports=routes;


