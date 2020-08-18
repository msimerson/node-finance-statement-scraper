'use strict';

const util        = require('util');

const htmlparser  = require('htmlparser2');

const jsdom       = require('jsdom');
// const { JSDOM }   = jsdom;

const yahoo       = require('./lib/yahoo');

exports.getIojs = function (done) {
  jsdom.env('https://iojs.org/dist/', ['http://code.jquery.com/jquery.js'], function (err, window) {
    if (err) console.error(err);
    done(err, window.$('a').length - 4);
  })
}

exports.getIncomeStatement = function (args, done) {
  // choose a provider, dispatch to provider
  // via config file, or switch after a provider faults?
  yahoo.getIncomeStatement(args, done);
}

exports.getBalanceSheet = function (args, done) {
  yahoo.getBalanceSheet(args, done);
}

exports.getCashFlow = function (args, done) {
  yahoo.getCashFlow(args, done);
}
