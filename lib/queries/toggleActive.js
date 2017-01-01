'use strict';

module.exports = function (id) {
  return 'UPDATE insights'
    + ' SET active = NOT insights.active WHERE '
    + 'id = ' + id + ';';
};
