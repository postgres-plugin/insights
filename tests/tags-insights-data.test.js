'use strict';

var test = require('tape');
var tagsOrgsData = require('../lib/fixtures/tags-insights-data.js');

test('Convert array of tags-insights to sql query', function (t) {
  var tagsOrgs = [
    {
      tags_id: 59,
      insights_id: 4
    },
    {
      tags_id: 82,
      insights_id: 4
    }
  ];
  var query = tagsOrgsData(tagsOrgs);
  var expected = 'INSERT INTO tags_insights '
    + '(tags_id, insights_id)'
    + ' VALUES '
    + '(59, 4),(82, 4);';

  t.equal(query, expected, 'Query to add tags_insights is ok');
  t.end();
});
