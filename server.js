require('dotenv').load();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const flash = require('connect-flash');

const app = express(); // create our app with express
const morgan = require('morgan'); // log request to the console (express4)
const bodyParser = require('body-parser'); // pull info from HTML POST (express4)

const routes = require('./api/routes');
const users = require('./api/routes/users');
const jobs = require('./api/routes/jobs');
const categories = require('./api/routes/categories');

// App config
const logger = require('./config/logger.js');
const config = require('./config');

config.db.connect();

// This will configure Passport to use Auth0
const strategy = new Auth0Strategy({
  domain: process.env.AUTH0_DOMAIN,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  callbackURL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback' 
  }, (accessToken, refreshToken, extraParams, profile, done) => {
  // accessToken is the token to call Auth0 API (not needed in the most cases)
  // extraParams.id_token has the JSON Web Token
  // profile has all the information from the user
  return done(null, profile);
});

passport.use(strategy);

// you can use this section to keep a smaller payload
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(express.static(`${__dirname}/public`)); // set the static files location /public/img will be /img for use
app.use(morgan('dev')); // log ecery request to the console
app.use(bodyParser.urlencoded({
  extended: 'true',
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({
  type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json

app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Handle auth failure error messages
app.use(function(req, res, next) {
 if (req && req.query && req.query.error) {
   req.flash("error", req.query.error);
 }
 if (req && req.query && req.query.error_description) {
   req.flash("error_description", req.query.error_description);
 }
 next();
});

// Check logged in
app.use(function(req, res, next) {
  res.locals.loggedIn = false;
  if (req.session.passport && typeof req.session.passport.user != 'undefined') {
    res.locals.loggedIn = true;
  }
  next();
});

// routes =========================================
app.use('/', routes);
app.use('/api/user', users);
app.use('/api/job', jobs);
app.use('/api/category', categories);

// application ========================================

// app.get('*', function (req, res) {
//   res.sendfile('./public.index.html'); // load the single view file (angular will handle the page changes on the front-end)
// });

// listen (start app with node server.js) ==========================
app.listen(5000);// define model ====================

logger.info('App listening on port 5000');
