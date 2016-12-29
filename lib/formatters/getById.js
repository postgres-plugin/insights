'use strict';

/* eslint-disable */
/*
getById takes an argument 'id'.
The array has the following format:
[{
  tid: 1,
  tname: 'Global Partner',
  iid: 1,
  title: 'Insight Number 1',
  url: 'https://....',
  author: 'Kamala Khan',
  creator_id: 1,
  date: 2016-12-23T11:27:41.760Z,
  active: true,
  resource: true },
 anonymous {
   tid: 8,
   tname: 'Agriculture',
   iid: 1,
   title: 'Insight Number 1',
   url: 'https://....',
   author: 'Kamala Khan',
   creator_id: 1,
   date: 2016-12-23T11:27:41.760Z,
   active: true,
   resource: true },
 anonymous {
   tid: 22,
   tname: 'Telecommunications',
   iid: 1,
   title: 'Insight Number 1',
   url: 'https://....',
   author: 'Kamala Khan',
   creator_id: 1,
   date: 2016-12-23T11:27:41.760Z,
   active: true,
   resource: true },
  anonymous {... ]

This is an array where the length is equal to the **number of tags** linked to the insight.

WE WANT TO CONVERT THIS INTO:
  [{
  id: 1,
  date: 2016-12-23T11:27:41.760Z,
  title: 'Insight Number 1',
  url: 'https://....',
  tags: [
  {
    tag_id: 8,
    tag_name: 'Agriculture'
  }, {
    tag_id: 22,
    tag_name: 'Telecommunications'
  }, {
  ...
  }]

*/
/* eslint-enable */

module.exports = function (insight) {
  var tags = [];

  // if no insight has been found
  if (insight.length === 0) {
    return [];
  }

  if (insight[0].tags_id) {
    tags = insight.map(function (obj) {
      return {
        id: obj.tags_id,
        name: obj.tags_name
      };
    });
  }

  return [{
    id: insight[0].id,
    title: insight[0].title,
    url: insight[0].url,
    doctype: insight[0].doctype,
    author: insight[0].author,
    creator_id: insight[0].creator_id,
    active: insight[0].active,
    tags: tags
  }];
};
