'use strict';

var test = require('tape');
var initServer = require('../../example/server.js');

var config = require('../../config/load-config.js');

function getInsight (tag) {
  return {
    method: 'GET',
    url: '/getById?id=' + tag
  };
}

test('/getById: active insight', function (t) {
  initServer(config, function (error, server, pool) {
    if (error) {
      return t.fail('Error starting the server, error: ', error);
    }

    return server.inject(getInsight(1), function (res) {
      var expected = [
        {
          id: 1,
          title: 'Insight Number 1',
          url: 'https://emf-packs.s3-eu-west-1.amazonaws.com/Growth%20Within%20-%20June%202015/EllenMacArthurFoundation_Growth%20Within_for%20print.pdf?AWSAccessKeyId=AKIAITAQSOURJ2COPP2A&Signature=exc0fbGigjcG88LlqNibztPX%2F3k%3D&Expires=1498468767',
          type: 'Report',
          author: 'Kamala Khan',
          creator_id: 1,
          active: true,
          resource: true,
          tags: [ {
            id: 8,
            name: 'Agriculture'
          }, {
            id: 1,
            name: 'Global Partner'
          }, {
            id: 22,
            name: 'Telecommunications'
          } ]
        }
      ];

      t.deepEquals(res.result, expected,
        'returns correct details and tag info of insight requested');

      return pool.end(function () {
        server.stop(t.end);
      });
    });
  });
});


// non-existent insight returns empty array
test('getById for insightId = 500', function (t) {
  initServer(config, function (error, server, pool) {
    if (error) {
      return t.fail('Error starting the server, error: ', error);
    }

    return server.inject(getInsight(500), function (res) {
      var expected = '[]';
      t.deepEquals(res.payload, expected,
        'empty array returned for non-existent insight');

      return pool.end(function () {
        server.stop(t.end);
      });
    });
  });
});
