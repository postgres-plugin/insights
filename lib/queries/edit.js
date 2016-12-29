'use strict';

var escape = require('pg-escape');

var escapeValues = [
  'title',
  'url',
  'doctype',
  'author'
];

var unescapeValues = [
  'org_id',
  'creator_id',
  'resource',
  'active'
];

function getValues (updatedData) {
  var escapedData = escapeValues.map(function (column) {
    var value = updatedData[column];
    var escaped = value === ('' || null) ? 'null' : escape.literal(value);
    return column + ' = ' + escaped;
  });

  var unescapedData = unescapeValues.map(function (column) {
    var value = updatedData[column];
    var unescaped = value === ('' || null) ? 'null' : value;
    return column + ' = ' + unescaped;
  });

  return escapedData.concat(unescapedData).join(', ');
}

module.exports = function (id, updatedData) {
  var formValues = getValues(updatedData);

  return [
    'UPDATE insights',
    'SET',
    formValues,
    'WHERE id = ' + id,
    ';'
  ].join(' ');
};
