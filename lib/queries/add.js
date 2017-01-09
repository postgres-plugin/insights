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

function getValues (rawData) {
  var escapedData = escapeValues.map(function (column) {
    var value = rawData[column];
    return value === ('' || null) ? 'null' : escape.literal(value);
  });

  var unescapedData = unescapeValues.map(function (column) {
    var value = rawData[column];
    if (column === 'active') {
      return value === true;
    }

    return value === ('' || null) ? 'null' : value;
  });

  return escapedData.concat(unescapedData).join(', ');
}

module.exports = function (rawData) {
  var formColumns = escapeValues.concat(unescapeValues).join(', ');
  var formValues = getValues(rawData);

  return [
    'INSERT INTO insights (',
    formColumns,
    ')',
    'VALUES (',
    formValues,
    ')',
    'RETURNING id;'
  ].join(' ');
};
