'use strict';

function convert(ids) {
  var res = '(';
  ids.forEach(function(id, i) {
    if (i < ids.length - 1) {
      res += id + ', ';
    } else {
      res += id;
    }
  });
  res += ')';
  return res;
}

module.exports = function (listOfTags) {
  return [
    'SELECT',
    'tags_id AS tag_id,',
    'insights.title,',
    'insights.id,',
    'insights.url,',
    'insights.type',
    'FROM',
    'tags_insights',
    'JOIN insights',
    'ON insights.id = tags_insights.insights_id',
    'WHERE tags_id IN ' + convert(listOfTags),
    'AND insights.active = true',
    'AND insights.resource <> true'
  ].join(' ');
};
