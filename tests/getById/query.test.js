'use strict';

var test = require('tape');
var getById = require('../../lib/queries/getById.js');

var query = 'SELECT'
  + ' insights.id AS id,'
  + ' insights.title AS title,'
  + ' insights.url AS url,'
  + ' insights.type AS type,'
  + ' insights.author AS author,'
  + ' insights.creator_id AS creator_id,'
  + ' insights.date AS date,'
  + ' insights.active AS active,'
  + ' insights.resource AS resource,'
  + ' tags.id AS tags_id,'
  + ' tags.name AS tags_name'
  + ' FROM insights'
  + ' LEFT OUTER JOIN tags_insights'
  + ' ON (tags_insights.insights_id = insights.id)'
  + ' LEFT OUTER JOIN tags'
  + ' ON (tags.id = tags_insights.tags_id)'
  + ' WHERE insights.id = 1'
  + ' ORDER BY date,'
  + ' tags_name ASC;'

test('Get insight by id', function (t) {
  t.equal(query, getById(1), 'Query to get an insight and associated tags, is returns correctly');
  t.end();
});
