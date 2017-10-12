function convert(insights) {
  var seen = {};
  var data;
  return insights.filter(function(insight) {
      var previous;

      if (seen.hasOwnProperty(insight.id)) {
          previous = seen[insight.id];
          previous.tags.push(insight.tag_id);

          return false;
      }

      if (!Array.isArray(insight.tag_id)) {
          insight.tags = [insight.tag_id];
      }

      seen[insight.id] = insight;

      return true;
  });
}

module.exports = function (rows) {
  var data = convert(rows);
  var insights = data.map(function(d) {
    return {
      id: d.id,
      title: d.title,
      url: d.url,
      type: d.type,
      matches: d.tags.length
    }
  })

  return insights.sort(function(i1, i2) {
    return i2.matches - i1.matches;
  })
};
