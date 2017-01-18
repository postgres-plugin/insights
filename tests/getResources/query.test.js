'use strict';

var test = require('tape');
var getResources = require('../../lib/queries/getResources.js');

var allResources = 'SELECT '
  + 'id, title, url, author, type '
  + 'FROM insights '
  + 'WHERE active = true '
  + 'AND resource = true '
  + 'ORDER BY date DESC;'

test('Get all resources', function (t) {
  var query = getResources();
  t.equal(query, allResources, 'Query to get all active resources returns correctly');
  t.end();
});
