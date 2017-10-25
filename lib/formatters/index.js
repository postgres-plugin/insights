'use strict';

var getById = require('./getById.js');
var browse = require('./browse.js');
var getMatchingInsights = require('./getMatchingInsights');

module.exports = {
  browse: browse,
  getById: getById,
  getMatchingInsights: getMatchingInsights
};
