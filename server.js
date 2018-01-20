// set up =========================

var express         = require('express');
var app             = express();                  // create our app with express
var mongoose        = require('mongoose');        // mongoose for mogodb
var morgan          = require('morgan');          // log request to the console (express4)
var bodyParser      = require('body-parser');     // pull info from HTML POST (express4)
var methodOverride  = require('method-override'); // simulate DELETE and PUT

// configuration ==================

//mongoose.connect('mongodb://localhost/test2')

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for use
app.use(morgan('dev'));                                         // log ecery request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

// define model ====================


// routes =========================================


// application ========================================

  app.get('*', function(req, res) {
    res.sendfile('./public.index.html'); // load the single view file (angular will handle the page changes on the front-end)
  });

// listen (start app with node server.js) ==========================

app.listen(5000);
console.log("App listening on port 5000");
