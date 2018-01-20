require('dotenv').load();
const express = require('express');

const app = express(); // create our app with express
const morgan = require('morgan'); // log request to the console (express4)
const bodyParser = require('body-parser'); // pull info from HTML POST (express4)

const users = require('./api/routes/users');
const jobs = require('./api/routes/jobs');

// App config
const logger = require('./config/logger.js');
const config = require('./config');

config.db.connect();

app.use(express.static(`${__dirname}/public`)); // set the static files location /public/img will be /img for use
app.use(morgan('dev')); // log ecery request to the console
app.use(bodyParser.urlencoded({
  extended: 'true',
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({
  type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json

// define model ====================


// routes =========================================
app.use('/api/user', users);
app.use('/api/job', jobs);


// application ========================================

app.get('*', (req, res) => {
  res.sendfile('./public.index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// listen (start app with node server.js) ==========================
app.listen(5000);
logger.info('App listening on port 5000');
