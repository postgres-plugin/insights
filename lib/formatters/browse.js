'use strict';


/* eslint-disable */
/*
ROWS ARE PASSED IN THE FOLLOWING FORMAT:
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

function tagFromRow (row) {
  return {
    tag_id: row.tid,
    tag_name: row.tname
  };
}

// helper function that takes a row and returns a insight object
function insightFromRow (row) {
  return {
    id: row.iid,
    title: row.title,
    url: row.url,
    author: row.author,
    creator_id: row.creator_id,
    date: row.date,
    active: row.active,
    tags: row.tid ? [tagFromRow(row)] : []
  };
}

module.exports = function getInsightsByTag (rows) {
  // We want to preserve the order that postgres returns
  // we will use the order array to store each unique insight id they appear
  var order = [];

  // define the name of the tag that we filter by
  var filter_tag = null;
  var insightsObject = rows.reduce(function (obj, row) {
    var insight_id = row.iid;

    // the filter_tag column only has a string in it for certain rows
    // NULL everywhere else. So if we find a value in this column
    // it will store the filter_tag
    if (row.filter_name) {
      filter_tag = { id: row.filter_id, name: row.filter_name };
    }

    if (!insight_id) {
      return obj;
    }

    // if this is a unique insight id
    if (!obj[insight_id]) {
      // add the id to the order array
      order.push(insight_id);


      obj[insight_id] = insightFromRow(row);
    } else {
      obj[insight_id].tags.push(tagFromRow(row));
    }

    return obj;
  }, {});
  // map through our array of ordered id's
  var insights = order.map(function (id) {
    return insightsObject[id];
  });

  return { filter: filter_tag, insights: insights };
};
