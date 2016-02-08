'use strict';

var assert = require('assert');
var fs     = require('fs');
var util   = require('util');

var finScraper = require('../index');

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

describe('getIncomeStatementYahoo', function () {
  it('gets an Income Statement from Yahoo', function (done) {
    finScraper.getIncomeStatementYahoo({symbol: 'AAPL'}, function (err, html) {
      assert.ifError(err);
      // console.log(util.inspect(html, {depth: null}));
      assert.ok(html);
      done();
      // fs.writeFile('test/fixtures/AAPL-IS.html', html, function (err) {
      //   if (err) {
      //     console.error(err);
      //   }
      //   done();
      // });
    });
  });
});

describe.only('parseIncomeStatementYahoo', function () {
  it('parses a Yahoo Income Statement from raw HTML', function (done) {
    fs.readFile('test/fixtures/AAPL-Yahoo-IS.html', function (err, data) {
      assert.ifError(err);
      assert.ok(data);
      var contents = data.toString();
      // console.log(util.inspect(contents, {depth: null}));
      finScraper.parseIncomeStatementYahoo(contents, function (err, parsed) {
        assert.ifError(err);
        assert.ok(parsed);
        console.log(util.inspect(parsed, {depth: null}));
        // .$('.yfnc_tabledata1')
        done();
      });
    });
  });
});
