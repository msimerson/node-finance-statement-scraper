
const util        = require('util');

const Crawler     = require('crawler');

const yahoo       = require('./lib/yahoo');


exports.getIojs = function (testDone) {

  const c = new Crawler({
      rateLimit: 1000,

      callback : function (err, res, done) {
          if (err) {
              console.log(err);
          }
          else {
              const $ = res.$;
              console.log($("title").text());
              testDone(err, res.$('a').length - 4)
          }
          done();
      }
  });

  c.queue('https://iojs.org/dist/');
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
