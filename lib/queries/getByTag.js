'use strict';

/*
* We pass getByTag a table that we want get ('insights') and a tag id
* that we want to filter by. This function should return all of the insights
* that meet that contain that tag.
*/

module.exports = function (activeOnly, tagId) {
  /* FIND ALL INSIGHTS BY TAG ID THEN GET ALL TAGS FOR THOSE INSIGHTS */
  var query = [
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
    'insights.type AS type,',
    tagId + ' AS filter_id,',
    // FOLLOWING LINE ADDS THE TAG THAT WE ARE FILTERING BY TO CERTAIN ROWS,
    '(SELECT tags.name WHERE tags.id = ' + tagId + ') AS filter_name',
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
    // PERFORM THIS QUERY FIRST
    // RETURNS A TABLE WITH ONE COLUMN CONTAINING ALL INSIGHT IDS THAT HAVE
    // THE GIVEN TAG ASSOCIATED,
    'SELECT insights_id as iid',
    'FROM tags_insights',
    'WHERE',
    // Primary users can only see active insights
    activeOnly ? 'insights.active = true AND' : '',
    'tags_insights.tags_id = ' + tagId,
    ')',
    'OR tags.id = ' + tagId,
    'ORDER BY insights.date DESC,',
    'insights.title ASC,',
    'tags.name ASC;'
  ];

  return query.join(' ');
};
