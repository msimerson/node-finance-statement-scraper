'use strict';

var util       = require('util');

var jsdom      = require('jsdom');
var htmlparser = require('htmlparser2');

var yahoo      = require('./lib/yahoo');

exports.getIojs = function (done) {
  jsdom.env(
    'https://iojs.org/dist/',
    ['http://code.jquery.com/jquery.js'],
    function (err, window) {
      if (err) { console.error(err); }
      done(err, window.$('a').length - 4);
    }
  );
};

exports.getIncomeStatement = function (args, done) {
  // choose a provider, dispatch to provider
  // via config file, or switch after a provider faults?
  yahoo.getIncomeStatement(args, done);
};

exports.getBalanceSheet = function (args, done) {
  // choose a provider, dispatch to provider
  // via config file, or switch after a provider faults?
  yahoo.getBalanceSheet(args, done);
};

exports.getProfitLoss = function (args, done) {
  // choose a provider, dispatch to provider
  // via config file, or switch after a provider faults?
  yahoo.getProfitLoss(args, done);
};
