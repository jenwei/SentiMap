/* Express router. Defines the server-side behavior of the various endpoints.
 Provides ability to GET all pages, POST a new page, and POST edits to a given page.*/

var express  = require('express');
//var router = express.Router();                             // create our app w/ express
var mongoose = require('mongoose'); 
var auth = require('../auth.js')
var routes = {};
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


//router.get('*', function(req, res) {
//     res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
//});


//router.get('/')

//router.get('/api/pages', function(req, res) {

//  Page.find({}, function(err, pages) {
    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
//    if (err) { 
//      console.log('Error!');
//    res.send(err) 
//
// create todo and send back all todos after creation
// router.post('/api/pages', function(req, res) {

//   // create a todo, information comes from AJAX request from Angular
//   Page.create({
//     name: req.body.name,
//     text : req.body.text,
//     author: req.body.author,
//     imageurl: req.body.imageurl
//   }, function(err, page) {
//     console.log('createPage')
//     if (err) {res.send(err);}

//     // get and return all the todos after you create another
//     Page.find({}, function(err, pages) {
//       if (err) {res.send(err)} 
//       res.json(pages);
//     });
//   });

// });

// // //edit a todo
// router.post('/api/pages/edit', function(req, res) {

//   // console.log(req)
//   Page.update({
//     //_id: mongojs.ObjectId(req.body._id)
//     _id: req.body._id
//   }, {
//     name: req.body.name,
//     text: req.body.text,
//     author: req.body.author,
//     lasteditedby: req.body.lasteditedby,
//     imageurl: req.body.imageurl
//   }, {}, function(err, page) {
//     if (err) {res.send(err);}

//       // get and return all the todos after you edit
//   Page.find(function(err, pages) {
//     if (err) {res.send(err); return;} 
//     res.json(pages);
//     });
//   });

// });

