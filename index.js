'use strict';

var util   = require('util');

var jsdom  = require('jsdom');
var htmlparser = require('htmlparser2');

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
  // regardless of source, we want to choose a provider and then dispatch
  // to that provider, perhaps via config file, or switch after a provider
  // faults.
  exports.getIncomeStatementYahoo(args, done);
};

exports.getIncomeStatementYahoo = function (args, done) {
  exports.fetchIncomeStatementYahoo(args, function (err, html) {
    exports.parseIncomeStatementYahoo(html, done);
  });
};

exports.fetchIncomeStatementYahoo = function (args, done) {

  var url = 'http://finance.yahoo.com/q/is?s=' + args.symbol;
  if (args.period === 'annual') {
    url += '&annual';
  }

  jsdom.env(
    url,
    // ['http://code.jquery.com/jquery.js'],
    function (err, window) {
      if (err) return done(err);
      // parser.parseComplete(window.document.body.innerHTML);
      done(err, window.document.body.innerHTML);
      // done(err, window.$('.yfnc_tabledata1'));
    }
  );
};

exports.parseIncomeStatementYahoo = function (html, done) {

  var report = {
    'Period Ending': [],
    'Total Revenue': [],
    'Cost of Revenue': [],
    'Gross Profit': [],

    // Operating Expenses
    'Research Development': [],
    'Selling General and Administrative': [],
    'Non Recurring': [],
    'Others': [],
    'Total Operating Expenses': [],
    'Operating Income or Loss': [],

    // Income from Continuing Operations
    'Total Other Income/Expenses Net': [],
    'Earnings Before Interest And Taxes': [],
    'Interest Expense': [],
    'Income Before Tax': [],
    'Income Tax Expense': [],
    'Minority Interest': [],
    'Net Income From Continuing Ops': [],

    // Non-Recurring Events
    'Discontinued Operations': [],
    'Extraordinary Items': [],
    'Effect Of Accounting Changes': [],
    'Other Items': [],
    'Net Income': [],
    'Preferred Stock And Other Adjustments': [],
    'Net Income Applicable To Common Shares': [],
  };

  var inSection='';

  var parser = new htmlparser.Parser({
    // onopentag: function (name, attribs) {
    //   if (name === 'script' && attribs.type === 'text/javascript') {
    //     console.log('JS! Hooray!');
    //   }
    // },
    ontext: function (text) {
      if (!/\S/.test(text)) return;        // whitespace only
      if (/function\(/.test(text)) return; // JS content
      text = text.replace(/\s+/, ' ').replace(/\s$/,'').trim();

      if (inSection !== '') {
        if (inSection === 'Period Ending' && !/\d\d\d\d$/.test(text)) {
          inSection = '';
        }
      }

      if (inSection === '') {
        if (report[text]) {
          inSection=text;
          return;
        }
        // console.log('-->', text);
        return;
      }

      report[inSection].push(text);
      if (inSection === 'Period Ending') return;
      if (report[inSection].length === report['Period Ending'].length) {
        inSection = '';
        return;
      }
    },
    // onclosetag: function (tagname){
    //   if (tagname === 'script') {
    //     console.log('Thats it?!');
    //   }
    // },
    onend: function () {
      console.log(util.inspect(report, {depth: null}));
      done(null, report);
    }
  }, {decodeEntities: true});
  parser.write(html);
  parser.end();
};