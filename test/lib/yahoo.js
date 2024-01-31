'use strict';

var assert  = require('assert');
var fs      = require('fs');
var util    = require('util');

var yahoo   = require('../../lib/yahoo');

describe('yahoo', function() {

  describe('fetchIncomeStatement', function () {
    this.timeout(3000)
    it('gets an Income Statement', function (done) {
      yahoo.fetchIncomeStatement({symbol: 'AAPL'}, function (err, html) {
        assert.ifError(err);
        // console.log(util.inspect(html, {depth: null}));
        assert.ok(html);
        done();
        // fs.writeFile('test/fixtures/AAPL-Yahoo-IS.html', html, function (err) {
        //   if (err) {
        //     console.error(err);
        //   }
        //   done();
        // })
      })
    })
  })

  describe('parseIncomeStatement', function () {
    it('parses a Yahoo Income Statement from raw HTML', function (done) {
      fs.readFile('test/fixtures/AAPL-Yahoo-IS.html', function (err, data) {
        assert.ifError(err);
        assert.ok(data);
        var contents = data.toString();
        // console.log(util.inspect(contents, {depth: null}));
        yahoo.parseIncomeStatement(contents, function (err, parsed) {
          assert.ifError(err);
          assert.ok(parsed);
          console.log(util.inspect(parsed, {depth: null}));
          // .$('.yfnc_tabledata1')
          done();
        })
      })
    })
  })

  describe.skip('getIncomeStatement', function () {
    it('fetches and parses a Yahoo Income Statement', function (done) {
      yahoo.getIncomeStatement({symbol: 'AAPL'}, function (err, report) {
        assert.ifError(err);
        assert.ok(report['Total Revenue'][0]);
        done();
      })
    })
  })

  describe('fetchBalanceSheet', function () {
    this.timeout(3000)
    it('gets a Balance Sheet', function (done) {
      yahoo.fetchBalanceSheet({symbol: 'AAPL'}, function (err, html) {
        assert.ifError(err);
        assert.ok(html);
        done();
        // fs.writeFile('test/fixtures/AAPL-Yahoo-BS.html', html, function (err) {
        //   if (err) {
        //     console.error(err);
        //   }
        //   done();
        // })
      })
    })
  })

  describe('parseBalanceSheet', function () {
    it('parses a Yahoo Balance Sheet from raw HTML', function (done) {
      fs.readFile('test/fixtures/AAPL-Yahoo-BS.html', function (err, data) {
        assert.ifError(err);
        assert.ok(data);
        var contents = data.toString();
        yahoo.parseBalanceSheet(contents, function (err, report) {
          assert.ifError(err);
          assert.ok(report['Total Assets'][0]);
          console.log(util.inspect(report, {depth: null}));
          done();
        })
      })
    })
  })

  describe('fetchCashFlow', function () {
    this.timeout(3000)
    it('gets a Cash Flow statement', function (done) {
      yahoo.fetchCashFlow({symbol: 'AAPL'}, function (err, html) {
        assert.ifError(err);
        assert.ok(html);
        done();
        // fs.writeFile('test/fixtures/AAPL-Yahoo-CF.html', html, function (err) {
        //   if (err) {
        //     console.error(err);
        //   }
        //   done();
        // })
      })
    })
  })

  describe('parseCashFlow', function () {
    it('parses a Yahoo Cash Flow from raw HTML', function (done) {
      fs.readFile('test/fixtures/AAPL-Yahoo-CF.html', function (err, data) {
        assert.ifError(err);
        assert.ok(data);
        var contents = data.toString();
        yahoo.parseCashFlow(contents, function (err, report) {
          assert.ifError(err);
          assert.ok(report['Depreciation'][0]);
          console.log(util.inspect(report, {depth: null}));
          done();
        })
      })
    })
  })
})
