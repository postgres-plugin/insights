'use strict';

var test = require('tape');
var add = require('../../lib/queries/add.js');

var insight = {
  creator_id: 1,
  org_id: null,
  title: "Handbook",
  url: 'http://www.scottrao.com/Rao-Barista.pdf',
  author: 'P Diffy',
  doctype: '.pdf',
  resource: false
};

var extraColumns = {
  creator_id: 1,
  org_id: null,
  title: "Handbook",
  url: 'http://www.scottrao.com/Rao-Barista.pdf',
  author: 'P Diffy',
  doctype: '.pdf',
  resource: false,
  abc: 'alphabet',
  num: 'numbers'
};

var expected = 'INSERT INTO insights'
  + ' ( title, url, doctype, author, org_id, creator_id, resource, active )'
  + ' VALUES ( '
  + "'Handbook', 'http://www.scottrao.com/Rao-Barista.pdf', '.pdf', 'P Diffy',"
  + " null, 1, false, false"
  + ' ) RETURNING id;';

test('Add insight', function (t) {
  var query = add(insight);
  t.equal(query, expected, 'Query to get all insights (active and inactive) returns correctly');
  t.end();
});

test('Add insight with extra unnecessary columns', function (t) {
  var query = add(extraColumns);
  t.equal(query, expected, 'Query to get all insights (active and inactive) returns correctly');
  t.end();
});
