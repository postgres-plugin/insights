'use strict';

var test = require('tape');
var init = require('../../example/server.js');
var config = require('../../config/load-config.js');

var activeInsight = 1;
var inactiveInsight = 2;

function toggleInsight (id) {
  return {
    method: 'GET',
    url: '/toggleActive?id=' + id
  };
}

function checkActivity (id) {
  return {
    method: 'GET',
    url: '/getById?id=' + id
  };
}

test('disable an active insight', function (t) {
  init(config, function (err, server, pool) {
    if (err) return t.fail('error initialising server');

    server.inject(checkActivity(activeInsight), function (res) {
      t.equal(res.result[0].active, true, 'insight is originally active');
      server.inject(toggleInsight(activeInsight), function (res) {
        t.equal(res.payload, '[]', 'empty array signifies successful toggle');
        server.inject(checkActivity(activeInsight), function (res) {
          t.equal(res.result[0].active, false, 'insight has been deactivated');
          t.end();
          pool.end()
          server.stop()
        });
      });
    });
  });
});

test('enable an inactive insight', function (t) {
  init(config, function (err, server, pool) {
    if (err) return t.fail('error initialising server');

    server.inject(checkActivity(inactiveInsight), function (res) {
      t.equal(res.result[0].active, false, 'insight is originally inactive');
      server.inject(toggleInsight(inactiveInsight), function (res) {
        t.equal(res.payload, '[]', 'empty array signifies successful toggle');
        server.inject(checkActivity(inactiveInsight), function (res) {
          t.equal(res.result[0].active, true, 'insight has been activated');
          t.end();
          pool.end()
          server.stop()
        });
      });
    });
  });
});
