'use strict';

var test = require('tape');
var initServer = require('../../example/server.js');

var config = require('../../config/load-config.js');

function getAll (activeOnly) {
  return {
    method: 'GET',
    url: activeOnly ? '/?active=true' : '/'
  };
}

function activeOnlyReturned (array) {
  return array.filter(function(insight) {
    return insight.active === false;
  });
}

test('getAll endpoint returns all insights', function (t) {
  initServer(config, function (err, server, pool) {
    if (err) {
      return t.fail('Error starting the server, error: ', err);
    }

    return server.inject(getAll(false), function (res) {
      t.equal(res.result.insights.length, 3, 'all 3 insights returned');
      t.equal(res.result.insights[2].active, false, 'inactive insight also returned');

      return pool.end(function () {
        server.stop(t.end);
      });
    });
  });
});

test('getAll endpoint returns active insights only', function (t) {
  initServer(config, function (err, server, pool) {
    if (err) {
      return t.fail('Error starting the server, error: ', err);
    }

    return server.inject(getAll(true), function (res) {
      t.equal(res.result.insights.length, 2, 'all 2 active insights returned');
      t.equal(activeOnlyReturned(res.result.insights).length, 0, 'no inactive insights returned');

      return pool.end(function () {
        server.stop(t.end);
      });
    });
  });
});
