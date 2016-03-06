/* 
app.js is where we define all the modules and exports we need, config mongoose, set up routes, and start the server.

Most of the get requests are now processed client-side.
*/

    // set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
    var taskModel = require("./models/postSchema.js");
    var privdata = require("./config.js"); // config file with db info (used .gitignore so it wouldn't be)
    var routes = require("./routes/index.js");
    var exphbs = require('express-handlebars');
    var path = require('path');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');


    // configuration =================
    mongoose.connect(privdata.mongodburl);     // connect to mongoDB database on localhost
    // mongoose.connect(process.env.MONGOLAB_URI);


    // app.engine('handlebars', exphbs ({defaultLayout: 'main', extname: '.handlebars'}));
    // app.set('view engine', 'handlebars');
    // app.set('views', path.join(__dirname, '/views'));

    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

    // // routes =========================
    app.get('/api/posts', routes.home);  // List of all shoe articles and search bar

    app.post('/api/pages', routes.pageEdit);  // A post request that edits the page specified

    app.post('/api/new', routes.pageNew);  // A post request that creates a new article

    app.post('/api/delete/:url', routes.pageDel);  // A post request that deletes an article

    // listen (start app with node server.js) ======================================
    var port = process.env.PORT || 3000;
    app.listen(port, function() {
        console.log("App listening on ", port);
    });
