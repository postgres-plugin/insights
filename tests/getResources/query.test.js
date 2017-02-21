'use strict';

var test = require('tape');
var getAllResources = require('../../lib/queries/getAllResources.js');
var getActiveResources = require('../../lib/queries/getActiveResources.js');

var allResources = 'SELECT '
  + 'id, title, url, author, type, active '
  + 'FROM insights '
  + 'WHERE resource = true '
  + 'ORDER BY date DESC;'

var activeResources = 'SELECT '
  + 'id, title, url, author, type '
  + 'FROM insights '
  + 'WHERE active = true '
  + 'AND resource = true '
  + 'ORDER BY date DESC;'


test('Get all resources', function (t) {
  var query = getAllResources();
  t.equal(query, allResources, 'Query to get all active resources returns correctly');
  t.end();
});

test('Get active resources only', function (t) {
  var query = getActiveResources();
  t.equal(query, activeResources, 'Query to get all active resources returns correctly');
  t.end();
});
