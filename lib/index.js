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

  var browse = function (active, filter, cb) {
    if (filter) {
      return query(queries.getByTag(filter, active), pool, function (err, res) { //eslint-disable-line
        if (err) {
          return cb(err);
        }

        return cb(null, formatters.browse(res.rows));
      });
    }

    return query(queries.getAll(active), pool, function (err, res) { //eslint-disable-line
      if (err) {
          return cb(err);
      }

      return cb(null, formatters.browse(res.rows));
    });
  };

  var add = function (insight, cb) {
    query(queries.add(insight), pool, function (err, res) { //eslint-disable-line
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

    server.method('pg.insights.getById', getById);
    server.method('pg.insights.add', add);
    server.method('pg.insights.browse', browse);

    return next();
  });
}

register.attributes = { name: 'insights' };

module.exports = register;
