'use strict';

var Boom = require('boom');
var query = require('pg-helpers').query;

var queries = require('./queries/index.js');
var initialiseQuery = require('./helpers/initialise-query.js');
var formatters = require('./formatters/index.js');

function register (server, options, next) {
  var pool = options.pool;
  var initQuery = initialiseQuery(options);

  var getById = function (id, cb) {
    return query(queries.getById(id), pool, function (queryErr, res) {
      if (queryErr) {
        return cb(queryErr, null);
      }
      return cb(queryErr, formatters.getById(res.rows));
    });
  };

  // initiliase data function
  query(initQuery, pool, function (initErr) {
    if (initErr) {
      return next(initErr);
    }

    server.method('pg.insights.getById', getById);

    return next();
  });
}

register.attributes = { name: 'insights' };

module.exports = register;
