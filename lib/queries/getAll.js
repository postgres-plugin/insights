'use strict';

// return details of active (and inactive) insights, along with associated tags.
// currently assumes that only admin have created insights
module.exports = function (activeOnly) {
  var query = [
    'SELECT',
    'tags.id AS tid,',
    'tags.name AS tname,',
    'insights.id AS iid,',
    'title,',
    'url,',
    'author,',
    'creator_id,',
    'date,',
    'insights.active',
    'FROM insights',
    'LEFT JOIN tags_insights ON (insights.id = tags_insights.insights_id)',
    'LEFT JOIN tags ON (tags.id = tags_insights.tags_id)',
    'ORDER BY date,',
    'tags.name ASC;'
  ];

  if (activeOnly) {
    query.splice(
      query.length - 2,
      0,
      'WHERE insights.active = true'
    );
  }

  return query.join(' ');
};
