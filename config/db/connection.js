const mongoose = require('mongoose');
const settings = require('./settings');
const logger = require('../logger');

// Changes the default mongoose promises library for the native one.
mongoose.Promise = global.Promise;

const connectionUrl = `mongodb://${settings.user}:${settings.pass}@${settings.host}:${settings.port}/${settings.db}`;

const options = {
  user: settings.user,
  pass: settings.pass,
};

module.exports = () => mongoose.connect(connectionUrl, options)
    .then(result => logger.debug('Successfully connected to MongoDB:', connectionUrl))
    .catch(error => logger.error(error));
