'use strict';

var test = require('tape');
var initServer = require('../../example/server.js');

var config = require('../../config/load-config.js');

function getResources(activeOnly) {
  return {
    method: 'GET',
    url: activeOnly ? '/resources?active=true' : '/resources'
  };
};

test('getResources endpoint returns all active resources', function (t) {
  initServer(config, function (err, server, pool) {
    if (err) {
      return t.fail('Error starting the server, error: ', err);
    }

    return server.inject(getResources(true), function (res) {
      var expected = {
        id: 1,
        title: 'Insight Number 1',
        url: 'https://emf-packs.s3-eu-west-1.amazonaws.com/Growth%20Within%20-%20June%202015/EllenMacArthurFoundation_Growth%20Within_for%20print.pdf?AWSAccessKeyId=AKIAITAQSOURJ2COPP2A&Signature=exc0fbGigjcG88LlqNibztPX%2F3k%3D&Expires=1498468767',
        author: 'Kamala Khan',
        type: 'REPORT'
      };
      t.equals(res.result.length, 1, 'All active resources displayed as expected');
      t.deepEquals(res.result[0], expected, 'Active resource correctly returned');

      return pool.end(function () {
        server.stop(t.end);
      });
    });
  });
});

test('getResources endpoint returns all active and inactive resources', function (t) {
  initServer(config, function (err, server, pool) {
    if (err) {
      return t.fail('Error starting the server, error: ', err);
    }

    return server.inject(getResources(), function (res) {
      var expected = [{
        id: 1,
        title: 'Insight Number 1',
        url: 'https://emf-packs.s3-eu-west-1.amazonaws.com/Growth%20Within%20-%20June%202015/EllenMacArthurFoundation_Growth%20Within_for%20print.pdf?AWSAccessKeyId=AKIAITAQSOURJ2COPP2A&Signature=exc0fbGigjcG88LlqNibztPX%2F3k%3D&Expires=1498468767',
        author: 'Kamala Khan',
        type: 'REPORT',
        active: true
      }, {
        id: 2,
        title: 'Insight Number 2',
        url: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS8nGH7cyac0GS8IWPiGSwWeliasSRM_X7NWYh_MyxMEicGYYrc',
        author: 'Jessica Jones',
        type: 'PRESENTATION',
        active: false
      }];
      t.equals(res.result.length, 2, 'All resources displayed as expected');
      t.deepEquals(res.result, expected, 'Both active and inactive resources correctly returned');

      return pool.end(function () {
        server.stop(t.end);
      });
    });
  });
});
