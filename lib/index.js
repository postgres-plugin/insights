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
        return cb(err, null);
      }
      return cb(null, res.rows);
    });
  };

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
      return query(queries.getByTag(active, filter), pool, function (err, res) { //eslint-disable-line
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

  var toggleActive = function(id, cb) {
    query(queries.toggleActive(id), pool, function(err, res) { //eslint-disable-line
      if (err) {
        return cb(err);
      }
      return cb(null, res.rows);
    });
  };

  var getResources = function(active, cb) {
    if (active) {
      return query(queries.getActiveResources(), pool, function (err, res) { //eslint-disable-line
        if (err) {
          return cb(err);
        }

        return cb(null, res.rows);
      });
    };

    return query(queries.getAllResources(), pool, function(err, res) { //eslint-disable-line
      if (err) {
        return cb(err);
      }

      return cb(null, res.rows);
    });
  };

  var insightsSearch = function(searchTerm, cb) {
    return query(queries.insightsSearch(searchTerm), pool, function(err, res) { //eslint-disable-line
      if (err) {
        return cb(err);
      }
      return cb(null, res.rows);
    });
  }

  // initiliase data function
  query(initQuery, pool, function (initErr) {
    if (initErr) {
      return next(initErr);
    }

    server.method('pg.insights.getResources', getResources);
    server.method('pg.insights.toggleActive', toggleActive);
    server.method('pg.insights.edit', edit);
    server.method('pg.insights.getById', getById);
    server.method('pg.insights.add', add);
    server.method('pg.insights.browse', browse);
    server.method('pg.insights.insightsSearch', insightsSearch);

    return next();
  });
}

register.attributes = { name: 'insights' };

module.exports = register;
