'use strict';

var test = require('tape');

var initServer = require('../../example/server.js');
var config = require('../../config/load-config.js');
var insights = require('ce100-mock-data').insights;

test('edit insight function', function (t) {
  var insightId = 2;
  var updatedInsight = {
    title: "Insight 2",
    url: 'New Insight URL',
    author: 'P Diffy',
    doctype: '.pdf',
    org_id: null,
    creator_id: 1,
    active: false,
    resource: false
  };
  var edit = {
    method: 'POST',
    url: '/edit?id=' + insightId,
    payload: updatedInsight
  };
  var viewAll = {
    method: 'GET',
    url: '/'
  }

  initServer(config, function (err, server, pool) {
    if (err) {
      return t.fail('Error starting the server, error: ', err);
    }
    return server.inject(viewAll, function (res) {
      t.ok(res.payload.indexOf(insights[insightId - 1].title) > -1, 'original insight title displayed!');
      t.ok(res.payload.indexOf(insights[insightId - 1].url) > -1, 'original insight url displayed!');
      return server.inject(edit, function (res) {
        t.deepEqual(res.payload, '[]', 'insight has been editted!');
        return server.inject(viewAll, function (res) {
          t.ok(res.payload.indexOf(updatedInsight.title) > -1, 'insight title has been updated!');
          t.ok(res.payload.indexOf(updatedInsight.url) > -1, 'insight url has been updated!');
          return pool.end(function () {
            server.stop(t.end);
          });
        });
      });
    });
  });
});
