'use strict';

var test = require('tape');
var init = require('../../example/server.js');
var config = require('../../config/load-config.js');

test('search for insights containing searchTerm in title', function (t) {
  init(config, function (err, server, pool) {
    server.inject({ url: '/insightsSearch?searchTerm=insight number 3' }, function (res) {
      t.equal(res.result.length, 1, 'Insights Number 1 found');
      t.end();
      pool.end();
      server.stop();
    });
  });
});

test('search for insights containing searchTerm in author', function (t) {
  init(config, function (err, server, pool) {
    server.inject({ url: '/insightsSearch?searchTerm=jennifer' }, function (res) {
      t.equal(res.result.length, 1, 'insights found by author');
      t.end();
      pool.end();
      server.stop();
    });
  });
});

test('search for insights containing searchTerm in tags', function (t) {
  init(config, function (err, server, pool) {
    server.inject({ url: '/insightsSearch?searchTerm=luxembourg' }, function (res) {
      t.equal(res.result.length, 1, 'insights found by tags');
      t.end();
      pool.end();
      server.stop();
    });
  });
});
