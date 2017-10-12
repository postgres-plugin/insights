'use strict';

var Hapi = require('hapi');
var pg = require('pg');
var Hoek = require('hoek');
// pg plugins
var tags = require('tags-system');
var challenges = require('pg-challenges');
var people = require('pg-people');
var insights = require('../lib/index.js');

// pg tables data
var data = require('ce100-mock-data');

function init (config, callback) {
  var server = new Hapi.Server();
  var pool = new pg.Pool(config.pg);
  var optionsTags = {
    pool: pool,
    reset: true,
    tags: data.tags,
    categories: data.categories
  };
  var optionsPeople = {
    pool: pool,
    reset: true,
    people: data.people,
    organisations: data.organisations,
    tags_organisations: data.tags_organisations
  };
  var optionsChallenges = {
    pool: pool,
    reset: true,
    challenges: data.challenges,
    tags_challenges: data.tags_challenges
  };
  var optionsInsights = {
    pool: pool,
    reset: true,
    insights: data.insights,
    tags_insights: data.tags_insights
  };


  pool.on('error', function () {
    console.log('Pool error'); // eslint-disable-line
  });
  server.connection({ port: config.port });

  // register tags plugin which will create the tags table
  // which is referenced in tags_organisations
  server.register({
    register: tags,
    options: optionsTags
  }, function (errorTags) {
    if (errorTags) {
      console.log('error tags'); // eslint-disable-line

      return callback(errorTags, server, pool);
    }

    return server.register({
      register: people,
      options: optionsPeople
    }, function (errorPeople) {
      if (errorPeople) {
        console.log('error people'); // eslint-disable-line

        return callback(errorPeople, server, pool);
      }

      return server.register({
        register: challenges,
        options: optionsChallenges
      }, function (errorChallenges) {
        if (errorChallenges) {
          console.log('error challenges'); //eslint-disable-line

          return callback(errorChallenges, server, pool);
        }

        return server.register({
          register: insights,
          options: optionsInsights
        }, function (errorInsights) {
          if (errorInsights) {
            console.log('error insights'); // eslint-disable-line

            return callback(errorInsights, server, pool);
          }

          server.route([
            {
              method: 'GET',
              path: '/toggleActive',
              handler: function (request, reply) {
                request.server.methods.pg.insights.toggleActive(request.query.id, function (error, response) { // eslint-disable-line
                  Hoek.assert(!error, 'toggleActive failed');
                  reply(response);
                });
              }
            }, {
              method: 'POST',
              path: '/edit',
              handler: function (request, reply) {
                request.server.methods.pg.insights.edit(request.query.id, request.payload, function (error, response) { // eslint-disable-line
                  Hoek.assert(!error, 'edit insight failed');
                  reply(response);
                });
              }
            }, {
              method: 'GET',
              path: '/getById',
              handler: function (request, reply) {
                request.server.methods.pg.insights.getById(request.query.id, function (error, response) { // eslint-disable-line
                  Hoek.assert(!error, 'getById failed');
                  reply(response);
                });
              }
            }, {
              method: 'POST',
              path: '/add',
              handler: function (request, reply) {
                request.server.methods.pg.insights.add(request.payload, function (error, response) { // eslint-disable-line
                  Hoek.assert(!error, 'add insights failed');
                  reply(response);
                });
              }
            }, {
              method: 'GET',
              path: '/',
              handler: function (request, reply) {
                request.server.methods.pg.insights.browse(request.query.active, request.query.id, function (error, response) { // eslint-disable-line
                  Hoek.assert(!error, 'get all insights failed');
                  reply(response);
                });
              }
            }, {
              method: 'GET',
              path: '/resources',
              handler: function (request, reply) {
                request.server.methods.pg.insights.getResources(request.query.active, function (error, response) { // eslint-disable-line
                  Hoek.assert(!error, 'get all resources failed');
                  reply(response);
                });
              }
            }, {
              method: 'GET',
              path: '/insightsSearch',
              handler: function (request, reply) {
                var searchTerm = request.query.searchTerm;

                request.server.methods.pg.insights.insightsSearch(searchTerm, function (error, response) { // eslint-disable-line
                  Hoek.assert(!error, 'insightsSearch failed');
                  reply(response);
                });
              }
            }, {
            method: 'GET',
            path: '/getMatchingInsights',
            handler: function (request, reply) {
              var listOfTags = request.query.listOfTags;

              request.server.methods.pg.insights.getMatchingInsights(listOfTags, function (error, response) { // eslint-disable-line
                Hoek.assert(!error, 'toggleActive failed');
                reply(response);
              });
            }
          }
          ]);

          return server.start(function (errorStart) {
            return callback(errorStart, server, pool);
          });
        });
      });
    });
  });
}

module.exports = init;
