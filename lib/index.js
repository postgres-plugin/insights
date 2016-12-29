'use strict';

var Boom = require('boom');
var query = require('pg-helpers').query;

var queries = require('./queries/index.js');
var initialiseQuery = require('./helpers/initialise-query.js');
var formatters = require('./formatters/index.js');

function register (server, options, next) {
  var pool = options.pool;
  var initQuery = initialiseQuery(options);

  var edit = function (id, insight, cb) {
    query(queries.edit(id, insight), pool, function (err, res) { //eslint-disable-line
      if (err) {
        return cb(err);
      }
      return cb(null, res.rows);
    });
  };

  // initiliase data function
  query(initQuery, pool, function (initErr) {
    if (initErr) {
      return next(initErr);
    }

    server.method('pg.insights.edit', edit);

    return next();
  });
}

register.attributes = { name: 'insights' };

module.exports = register;
