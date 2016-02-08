'use strict';

var assert = require('assert');
var fs     = require('fs');
var util   = require('util');

var finScraper = require('../index');
var testCase = { symbol: 'TSLA', period: 'annual' };

describe('getIojs', function () {
  it('counts io.js releases', function (done) {
    finScraper.getIojs(function (err, count) {
      console.log('there have been', count, 'io.js releases.');
      assert.ifError(err);
      assert.ok(count);
      done();
    });
  });
});

describe('getIncomeStatement', function () {
  it('dispatches to a provider', function (done) {
    finScraper.getIncomeStatement(testCase, function (err, report) {
      assert.ifError(err);
      assert.ok(report['Total Revenue'][0]);
      console.log(util.inspect(report, {depth: null}));
      done();
    });
  });
});

describe('getBalanceSheet', function () {
  it('dispatches to a provider', function (done) {
    finScraper.getBalanceSheet(testCase, function (err, report) {
      assert.ifError(err);
      assert.ok(report['Total Assets'][0]);
      console.log(util.inspect(report, {depth: null}));
      done();
    });
  });
});

describe('getCashFlow', function () {
  it('dispatches to a provider', function (done) {
    finScraper.getCashFlow(testCase, function (err, report) {
      assert.ifError(err);
      assert.ok(report['Depreciation'][0]);
      console.log(util.inspect(report, {depth: null}));
      done();
    });
  });
});
