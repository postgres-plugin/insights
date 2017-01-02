'use strict';

var test = require('tape');
var getByTag = require('../../lib/queries/getByTag.js');

var activeOnlyInsights = [
  'SELECT',
  'tags.id AS tid,',
  'tags.name AS tname,',
  'insights.id AS iid,',
  'insights.title AS title,',
  'insights.url AS url,',
  'insights.author AS author,',
  'insights.creator_id AS creator_id,',
  'insights.date AS date,',
  'insights.active AS active,',
  '22 AS filter_id,',
  '(SELECT tags.name WHERE tags.id = 22) AS filter_name',
  'FROM tags_insights',
  'JOIN',
  'insights',
  'ON',
  'tags_insights.insights_id = insights.id',
  'RIGHT OUTER JOIN',
  'tags',
  'ON',
  'tags_insights.tags_id = tags.id',
  'WHERE tags_insights.insights_id',
  'IN (',
  'SELECT insights_id as iid',
  'FROM tags_insights',
  'WHERE tags_insights.tags_id = 22',
  ')',
  'OR tags.id = 22',
  'ORDER BY insights.date DESC,',
  'insights.title ASC,',
  'tags.name ASC;'
].join(' ');

var inactiveInsights = [
  'SELECT',
  'tags.id AS tid,',
  'tags.name AS tname,',
  'insights.id AS iid,',
  'insights.title AS title,',
  'insights.url AS url,',
  'insights.author AS author,',
  'insights.creator_id AS creator_id,',
  'insights.date AS date,',
  'insights.active AS active,',
  '12 AS filter_id,',
  '(SELECT tags.name WHERE tags.id = 12) AS filter_name',
  'FROM tags_insights',
  'JOIN',
  'insights',
  'ON',
  'tags_insights.insights_id = insights.id',
  'RIGHT OUTER JOIN',
  'tags',
  'ON',
  'tags_insights.tags_id = tags.id',
  'WHERE tags_insights.insights_id',
  'IN (',
  'SELECT insights_id as iid',
  'FROM tags_insights',
  'WHERE tags_insights.tags_id = 12',
  ')',
  'OR tags.id = 12',
  'WHERE insights.active = true',
  'ORDER BY insights.date DESC,',
  'insights.title ASC,',
  'tags.name ASC;'
].join(' ');

test('Get all active insights with tag 22', function (t) {
  var query = getByTag(22, false);
  t.equal(query, activeOnlyInsights, 'Query to get all insights (active and inactive) returns correctly');
  t.end();
});

test('Get all active and inactive insights with tag 12', function (t) {
  var query = getByTag(12, true);
  t.equal(query, inactiveInsights, 'Query to get active insights returns correctly');
  t.end();
});
