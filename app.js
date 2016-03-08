//Main application file. Creates connection to database, creates app endpoints, 
//listens to port 3000 or PORT environment variable.
//This app is on Heroku! 
var express  = require('express');
var index = require('./routes/index.js');                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var favicon = require('serve-favicon');
var app = express();
//console.log(process.env['MONGOLAB_URI']);
//mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/pages');
mongoose.connect('mongodb://localhost/test');
//mongoose.connect('mongodb://brenna:char@ds017688.mlab.com:17688/musicwiki');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected!');
});     // connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(favicon(__dirname + '/public/images/favicon.ico'));


app.get('/sentiment', index);
app.get('/political', index);
app.get('*', index);

// listen (start app with node server.js) ======================================

var PORT = process.env.PORT || 3000;
app.listen(PORT, function(err) {
    if(err)console.log(err);
    else console.log('Running on port: ' + PORT);
});


module.exports = app;