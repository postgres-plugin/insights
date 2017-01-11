'use strict';

var test = require('tape');
var fs = require('fs');
var path = require('path');
var initialiseQuery = require('../lib/helpers/initialise-query.js');
var file = path.resolve(__dirname, '../lib/fixtures/create-tables.sql');
var fileDrop = path.resolve(__dirname, '../lib/fixtures/drop-tables.sql');
var createTables = fs.readFileSync(file, 'utf8').toString();
var dropTables = fs.readFileSync(fileDrop, 'utf8').toString();

test('Create intialise query with reset = false', function (t) {
  var options = {
    reset: false,
    insights: [],
    tags_insights: []
  };

  var query = initialiseQuery(options);

  t.equal(query, createTables, 'Initialise query with reset false ok');
  t.end();
});

test('Create intialise query with reset = true', function (t) {
  var insights = [
    {
      title: 'Insight Number 4',
      url: 'https://www.ellenmacarthurfoundation.org/assets/downloads/ce100/Reverse-Logistics.pdf',
      type: 'Report',
      author: 'EMF',
      creator_id: '1',
      org_id: null,
      active: true,
      resource: true
    }
  ];
  var tagsInsights = [
    {
      tags_id: 59,
      insights_id: 4
    },
    {
      tags_id: 82,
      insights_id: 4
    }
  ];
  var options = {
    reset: true,
    insights: insights,
    tags_insights: tagsInsights
  };

  var query = initialiseQuery(options);

  t.equal(query.indexOf('-- Delete table') > -1, true, 'The tables are deleted');
  t.equal(query.indexOf('-- Create table') > -1, true, 'The tables are created');
  t.equal(query.indexOf('INSERT INTO insights') > -1, true, 'Values inserted');
  t.end();
});
