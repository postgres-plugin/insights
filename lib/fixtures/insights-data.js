'use strict';

/**
* Convert an array of insights object to a sql insert command
*/

var escape = require('pg-escape');

module.exports = function (insights) {
  var result = '';
  var values = '';

  if (insights.length > 0) {
    values = insights.map(function (d) {
      return '( '
      + escape.literal(d.title) + ', '
      + escape.literal(d.url) + ', '
      + escape.literal(d.doctype) + ', '
      + escape.literal(d.author) + ', '
      + d.creator_id + ', '
      + d.org_id + ', '
      + d.active + ', '
      + d.resource + ' )';
    }).join(',');

    result = 'INSERT INTO insights ( '
      + 'title, '
      + 'url, '
      + 'doctype, '
      + 'author, '
      + 'creator_id, '
      + 'org_id, '
      + 'active, '
      + 'resource '
      + ') VALUES ' + values + ';';
  }

  return result;
};
