'use strict';

module.exports = function (searchTerm) {
  var insightQuery = [
    'SELECT',
    'insights.id,',
    'title,',
    'author,',
    'type',
    'FROM insights',
    'WHERE (insights.active = true',
    'AND resource = false)',
    'AND (LOWER(title) like \'%' + searchTerm + '%\'',
    'OR LOWER(author) like \'%' + searchTerm + '%\')'
  ];

  var insightsTagQuery = [
    'SELECT',
    'insights.id,',
    'title,',
    'author,',
    'type',
    'FROM insights',
    'JOIN tags_insights',
    'ON tags_insights.insights_id = insights.id',
    'JOIN tags',
    'ON tags_insights.tags_id = tags.id',
    'WHERE LOWER(tags.name) like \'%' + searchTerm + '%\'',
    'AND insights.resource = false',
    'ORDER BY id DESC;'
  ];

  return insightQuery.concat(['UNION'], insightsTagQuery).join(' ');
};
