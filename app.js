/*
	app.js: Main application file. Creates connection to database, creates 
	app endpoints, listens to port 3000 or PORT environment variable.
*/

var express  = require('express');
var index = require('./routes/index.js');           // create our app w/ express
var mongoose = require('mongoose');                 // mongoose for mongodb
var morgan = require('morgan');             		// log requests to the console (express4)
var bodyParser = require('body-parser');    		// pull information from HTML POST (express4)
var methodOverride = require('method-override'); 	// simulate DELETE and PUT (express4)
var favicon = require('serve-favicon');
var app = express();

// logic for dealing with local vs heroku
if(process.env.MONGOLAB_URI){ // assume that this is heroku and that all the env vars are set
	var auth = {
		consumer_key: process.env.con_key,
		consumer_secret: process.env.con_secret,
		access_token: process.env.acc_token,
		access_token_secret: process.env.acc_token_secret,
		indico_api_key: process.env.indico_api_key,
		google_api_key: process.env.google_api_key,
		mongo: process.env.MONGOLAB_URI
	};
} else { // if running locally
	var auth = require('./auth.js');
}
var MONGOLAB_URI = auth.mongo;
mongoose.connect(MONGOLAB_URI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
  console.log('DB connected');
});     // connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.get('/', index.home);
app.get('/data', index.GETdata);

var PORT = process.env.PORT || 3000;
app.listen(PORT, function(err) {
    if(err) console.log(err);
    else console.log('App listening on port ' + PORT);
});

module.exports = app;