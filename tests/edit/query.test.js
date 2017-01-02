'use strict';

var test = require('tape');
var edit = require('../../lib/queries/edit.js');
var insightId = 2;
var updatedInsight = {
  title: "Insight 2",
  url: 'New Insight URL',
  author: 'P Diffy',
  doctype: '.pdf',
  org_id: null,
  creator_id: 1,
  active: false,
  resource: false
};
var query = [
  'UPDATE insights',
  'SET',
  'title = \'Insight 2\',',
  'url = \'New Insight URL\',',
  'doctype = \'.pdf\',',
  'author = \'P Diffy\',',
  'org_id = null,',
  'creator_id = 1,',
  'resource = false',
  'WHERE id = ' + insightId + ' ;'
].join(' ');

test('edit query string', function (t) {
  t.equal(edit(insightId, updatedInsight), query,
    'edit function takes an object and outputs a valid query string');
  t.end();
});
