'use strict';

var test = require('tape');
var initServer = require('../../example/server.js');

var config = require('../../config/load-config.js');

test('get matching insights', function (t) {
  initServer(config, function (err, server, pool) {
    if (err) {
      return t.fail('Error starting the server, error: ', err);
    }

    var req = {
      method: 'GET',
      url: '/getMatchingInsights?listOfTags=38&listOfTags=1'
    };

    return server.inject(req, function (res) {
      t.equal(res.result.length, 1, 'Matching one insight with the tag 38');

      return pool.end(function () {
        server.stop(t.end);
      });
    });
  });
});
