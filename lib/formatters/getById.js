'use strict';

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
    type: insight[0].type,
    author: insight[0].author,
    creator_id: insight[0].creator_id,
    active: insight[0].active,
    resource: insight[0].resource,
    tags: tags
  }];
};
