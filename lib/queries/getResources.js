'use strict';

// return details of all active resources
module.exports = function () {
  return [
    'SELECT',
    'id, title, url, author, type',
    'FROM insights',
    'WHERE active = true',
    'AND resource = true',
    'ORDER BY date DESC;',
  ].join(' ');
};
