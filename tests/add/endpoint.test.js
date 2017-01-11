'use strict';

var test = require('tape');
var initServer = require('../../example/server.js');
var config = require('../../config/load-config.js');

var insight = {
  creator_id: 1,
  org_id: null,
  title: "Handbook",
  url: 'http://www.scottrao.com/Rao-Barista.pdf',
  author: 'P Diffy',
  type: 'Report',
  resource: false
};

var getAll = {
  method: 'GET',
  url: '/'
};

function addInsight (insight) {
  return {
    method: 'POST',
    url: '/add',
    payload: insight
  };
}

test('/add endpoint', function (t) {
  var insightId;

  initServer(config, function (err, server, pool) {
    if (err) {
      return t.fail('Error starting the server, error: ', err);
    }

    return server.inject(addInsight(insight), function (res) {
      insightId = res.result[0].id;
      return server.inject(getAll, function (res) {
        t.equal(res.result.insights.length, insightId, 'ID of new insight === the total number of insights');
        t.equal(res.result.insights[0].title, insight.title, 'title of new insight is displayed in Browse view');
        t.equal(res.result.insights[0].url, insight.url, 'url of new insight is displayed in Browse view');

        return pool.end(function () {
          server.stop(t.end);
        });
      });
    });
  });
});
