'use strict';

var getById = require('./getById.js');

var add = require('./add.js');
var getAll = require('./getAll.js');
var getByTag = require('./getByTag.js');

module.exports = {
  getAll: getAll,
  getByTag: getByTag,
  add: add,
  getById: getById
};
