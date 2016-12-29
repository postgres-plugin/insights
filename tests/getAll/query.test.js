'use strict';

var test = require('tape');
var getAll = require('../../lib/queries/getAll.js');

var allInsights = 'SELECT '
  + 'tags.id AS tid, '
  + 'tags.name AS tname, '
  + 'insights.id AS iid, '
  + 'title, '
  + 'url, '
  + 'author, '
  + 'creator_id, '
  + 'date, '
  + 'insights.active '
  + 'FROM insights '
  + 'LEFT JOIN tags_insights ON (insights.id = tags_insights.insights_id) '
  + 'LEFT JOIN tags ON (tags.id = tags_insights.tags_id) '
  + 'ORDER BY date, '
  + 'tags.name ASC;'

var activeInsights = 'SELECT '
  + 'tags.id AS tid, '
  + 'tags.name AS tname, '
  + 'insights.id AS iid, '
  + 'title, '
  + 'url, '
  + 'author, '
  + 'creator_id, '
  + 'date, '
  + 'insights.active '
  + 'FROM insights '
  + 'LEFT JOIN tags_insights ON (insights.id = tags_insights.insights_id) '
  + 'LEFT JOIN tags ON (tags.id = tags_insights.tags_id) '
  + 'WHERE insights.active = true '
  + 'ORDER BY date, '
  + 'tags.name ASC;'

test('Get all insights', function (t) {
  var query = getAll(false);
  t.equal(query, allInsights, 'Query to get all insights (active and inactive) returns correctly');
  t.end();
});

test('Get all active insights', function (t) {
  var query = getAll(true);
  t.equal(query, activeInsights, 'Query to get active insights returns correctly');
  t.end();
});
