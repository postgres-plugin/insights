'use strict';

var test = require('tape');
var insightsData = require('../lib/fixtures/insights-data.js');

test('Convert array of insights to sql query', function (t) {
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
  var query = insightsData(insights);
  var expected = [
    'INSERT INTO insights',
    '(',
    'title,',
    'url,',
    'type,',
    'author,',
    'creator_id,',
    'org_id,',
    'active,',
    'resource',
    ')',
    'VALUES',
    '(',
    '\'Insight Number 4\',',
    '\'https://www.ellenmacarthurfoundation.org/assets/downloads/ce100/Reverse-Logistics.pdf\',',
    '\'.pdf\',',
    '\'EMF\',',
    '1,',
    'null,',
    'true,',
    'true',
    ');'
  ].join(' ');

  t.deepEqual(query, expected, 'Query to add insights is ok');
  t.end();
});
