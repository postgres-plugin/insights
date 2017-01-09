'use strict';

var toggleActive = require('./toggleActive.js');
var edit = require('./edit.js');
var getById = require('./getById.js');
var add = require('./add.js');
var getAll = require('./getAll.js');
var getByTag = require('./getByTag.js');

module.exports = {
  getAll: getAll,
  getByTag: getByTag,
  add: add,
  getById: getById,
  edit: edit,
  toggleActive: toggleActive
};
