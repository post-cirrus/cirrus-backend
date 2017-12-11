'use strict';

process.env['ALLOW_CONFIG_MUTATIONS'] = true;
// const appConfig = require('config');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

var app = require('express')();
var mongoose = require('mongoose');
var SwaggerExpress = require('swagger-express-mw');
var log = require('./api/helpers/logger');
module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

var SERVER_PORT = process.env.SERVER_PORT;
var SERVER_URL = process.env.SERVER_URL;
var MONGOSE_URL = process.env.MONGOSE_URL;
var MONGOSE_PORT = process.env.MONGOSE_PORT;

log.debug(
  '\n\tMongo DB URL: ' + MONGOSE_URL +
  '\n\tMongo DB PORT: ' + MONGOSE_PORT +
  '\n' +
  '\n\tAPPLICATION SERVER URL: ' + SERVER_URL +
  '\n\tAPPLICATION SERVER PORT: ' + SERVER_PORT +
  '\n'
);

app.use(require('morgan')('combined', { 'stream': log.stream }));

SwaggerExpress.create(config, function (err, swaggerExpress) {
  if (err) {
    throw err;
  }

  swaggerExpress.register(app);
  mongoose.connect('mongodb://' + MONGOSE_URL + ':' + MONGOSE_PORT + '/Cirrus', {useMongoClient: true});
  mongoose.connection.on('error', log.error.bind(log, 'connection error: '));
  mongoose.connection.once('open', function () {
    app.listen(SERVER_PORT, function () {
      log.info('Starting Cirrus Backend service: http://' + SERVER_URL + ':' + SERVER_PORT);
    });
  });
});
