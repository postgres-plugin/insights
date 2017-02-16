'use strict';

// return details of all active resources
module.exports = function () {
  return [
    'SELECT',
    'id, title, url, author, type, active',
    'FROM insights',
    'WHERE resource = true',
    'ORDER BY date DESC;',
  ].join(' ');
};
