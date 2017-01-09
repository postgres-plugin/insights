'use strict';

var test = require('tape');
var initServer = require('../../example/server.js');

var config = require('../../config/load-config.js');

var filterTag = 22;

function getByTag (activeOnly, filter) {
  var url = '/';
  if (activeOnly) {
    url += '?active=true';
  }
  if (filter) {
    url += '?id=' + filter;
  }

  return {
    method: 'GET',
    url: url
  };
}

function activeOnlyReturned (array) {
  return array.filter(function(insight) {
    return insight.active === false;
  });
}

test('insights /getByTag: get all active and inactive tags with tagid = ' + filterTag, function (t) {
  var expectedTags = [
    {
      tag_id: 8,
      tag_name: 'Agriculture'
    },
    {
      tag_id: 1,
      tag_name: 'Global Partner'
    },
    {
      tag_id: 22,
      tag_name: 'Telecommunications'
    }
  ];
  var filterDetails = { id: 22, name: 'Telecommunications' };

  initServer(config, function (err, server, pool) {
    if (err) {
      return t.fail('Error starting the server, error: ', err);
    }

    return server.inject(getByTag(false, filterTag), function (res) {
      t.equal(
        res.result.insights.length,
        1,
        'only 1 insight returned'
      );
      t.equal(
        res.result.insights[0].title,
        'Insight Number 1',
        'correct insight title returned'
      );
      t.equal(
        res.result.insights[0].url,
        'https://emf-packs.s3-eu-west-1.amazonaws.com/Growth%20Within%20-%20June%202015/EllenMacArthurFoundation_Growth%20Within_for%20print.pdf?AWSAccessKeyId=AKIAITAQSOURJ2COPP2A&Signature=exc0fbGigjcG88LlqNibztPX%2F3k%3D&Expires=1498468767',
        'correct insight url returned'
      );
      t.equal(
        res.result.insights[0].author,
        'Kamala Khan',
        'correct insight author returned'
      );
      t.deepEqual(
        res.result.insights[0].tags,
        expectedTags,
        'correct insight author returned'
      );
      t.deepEqual(
        res.result.filter,
        filterDetails,
        'correct insight author returned'
      );
      return pool.end(function () {
        server.stop(t.end);
      });
    });
  });
});

test('getByTag endpoint returns empty array when no insights match', function (t) {
  var filterDetails = { id: 69, name: 'Design for disassembly' };

  initServer(config, function (err, server, pool) {
    if (err) {
      return t.fail('Error starting the server, error: ', err);
    }

    return server.inject(getByTag(false, '69'), function (res) {
      t.deepEqual(
        res.result.filter,
        filterDetails,
        'the filter tag returns correctly'
      );
      t.deepEqual(
        res.result.insights,
        [],
        'insights is empty when there are no matches'
      );

      return pool.end(function () { // eslint-disable-line
        server.stop(t.end);
      });
    });
  });
});
