'use strict';

/**
* create an sql query which
* - create the insights and tags_insights tables if not defined
* - add some content to the table if options.reset is true
*/
var path = require('path');
var fs = require('fs');
var dropFile = path.resolve(__dirname, '../fixtures/drop-tables.sql');
var createTablesFile = path.resolve(__dirname, '../fixtures/create-tables.sql');
var dropTables = fs.readFileSync(dropFile, 'utf8').toString();
var createTables = fs.readFileSync(createTablesFile, 'utf8').toString();
var insightsData = require('../fixtures/insights-data.js');
var tagsInsightsData = require('../fixtures/tags-insights-data.js');

module.exports = function (options) {
  var query = '';

  if (options.reset) {
    query += dropTables;
    query += createTables;
    query += insightsData(options.insights);
    query += tagsInsightsData(options.tags_insights);

    return query;
  }

  return createTables;
};
