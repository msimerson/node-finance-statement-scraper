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
