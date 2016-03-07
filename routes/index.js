/* Express router. Defines the server-side behavior of the various endpoints.
 Provides ability to GET all pages, POST a new page, and POST edits to a given page.*/
 
var express  = require('express');
var router = express.Router();                             // create our app w/ express
var mongoose = require('mongoose'); 

var Page = require('../models/pageModel.js')


// routes ======================================================================

    // api ---------------------------------------------------------------------
    // get all todos
router.get('/api/pages', function(req, res) {

  // use mongoose to get all todos in the database

  // Page.create({
  //   name: 'page2',
  //   text: 'stuff!',
  // }, function(err, page) 
  // {
  //   if(err) console.log('error creating page!');
  // })

  Page.find({}, function(err, pages) {
    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err) { 
      console.log('Error!');
      res.send(err) 
    }
    console.log('Pages: ' + pages)
    res.json(pages); // return all todos in JSON format
  });
});

// create todo and send back all todos after creation
router.post('/api/pages', function(req, res) {

  // create a todo, information comes from AJAX request from Angular
  Page.create({
    name: req.body.name,
    text : req.body.text,
    author: req.body.author,
    imageurl: req.body.imageurl
  }, function(err, page) {
    console.log('createPage')
    if (err) {res.send(err);}

    // get and return all the todos after you create another
    Page.find({}, function(err, pages) {
      if (err) {res.send(err)} 
      res.json(pages);
    });
  });

});

// //edit a todo
router.post('/api/pages/edit', function(req, res) {

  // console.log(req)
  Page.update({
    //_id: mongojs.ObjectId(req.body._id)
    _id: req.body._id
  }, {
    name: req.body.name,
    text: req.body.text,
    author: req.body.author,
    lasteditedby: req.body.lasteditedby,
    imageurl: req.body.imageurl
  }, {}, function(err, page) {
    if (err) {res.send(err);}

      // get and return all the todos after you edit
  Page.find(function(err, pages) {
    if (err) {res.send(err); return;} 
    res.json(pages);
    });
  });

});


// //complete a todo
// router.post('/api/todos/:todo_id', function(req, res) {

//   // console.log(req)
//   Todo.update({
//     //_id: mongojs.ObjectId(req.body._id)
//     _id: req.params.todo_id
//   }, {
//     isCompleted: true
//   }, {}, function(err, todo) {
//     console.log('Todo completed!');
//     if (err) {res.send(err);}

//       // get and return all the todos after you edit
//   Todo.find(function(err, todos) {
//     if (err) {res.send(err); return;} 
//     res.json(todos);
//     });
//   });

// });

// // delete a todo
// router.delete('/api/todos/:todo_id', function(req, res) {
//   Todo.remove({
//       _id : req.params.todo_id
//   }, function(err, todo) {
//     if (err)
//       res.send(err);

//     // get and return all the todos after you create another
//     Todo.find(function(err, todos) {
//       if (err) {res.send(err)}
//       res.json(todos);
//     });
//   });
// });

router.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

module.exports = router;