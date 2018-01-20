const path = require('path');

const rootPath = path.normalize(`${__dirname}/..`);
const winston = require('winston');
const fs = require('fs');

const verifyDirectory = (done) => {
  const dir = 'logs/';
  if (!fs.existsSync(dir)) {
    fs.mkdir(dir, done);
  } else {
    done();
  }
};

const init = () => verifyDirectory(err => err && winston('debug', 'Error! - logs folder wasn\'t created', err));

init();

const logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      name: 'error',
      filename: `${rootPath}/logs/error.log`,
      level: 'error',
    }),
    new winston.transports.File({
      name: 'info',
      filename: `${rootPath}/logs/info.log`,
      level: 'info',
    }),
    new winston.transports.File({
      name: 'warn',
      filename: `${rootPath}/logs/warn.log`,
      level: 'warn',
    }),
    new winston.transports.Console({
      level: 'debug',
      prettyPrint: true,
      colorize: true,
      silent: false,
      timestamp: true,
    }),
  ],
});

module.exports = logger;

