'use strict';

/**
* Convert an array of tags-insights object to a sql insert command
*/

module.exports = function (tags_insights) {
  var result = '';
  var values = '';

  if (tags_insights.length > 0) {
    values = tags_insights.map(function (ti) {
      return '('
      + ti.tags_id + ', '
      + ti.insights_id + ')';
    }).join(',');

    result = 'INSERT INTO tags_insights ('
      + 'tags_id, '
      + 'insights_id'
      + ') VALUES ' + values + ';';
  }

  return result;
};
