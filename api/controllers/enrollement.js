'use strict';

var User = require('../models/User');
var log = require('../helpers/logger');

module.exports = {

  enrolleUser: function (request, response, next) {
    var user = new User(request.swagger.params.user.value);
    log.debug('Create request received: ' + JSON.stringify(request.swagger.params.user, null, 2));
    User.create(user, function (error, user) {
      if (error) {
        if (error) {
          log.error('Creating User ERROR: ' + JSON.stringify(error, null, 2));
          return response.status(400).json({'message': error.errmsg}).end();
        }
      }
      log.debug('User information: \n"' + user + '"\n => created in DB.');
      return response.status(200).json(user).end();
    });
  }

};
