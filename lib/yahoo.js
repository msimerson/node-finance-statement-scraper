'use strict';

var util       = require('util');

var jsdom      = require('jsdom');
var htmlparser = require('htmlparser2');

var lastRequest = null;  // timer, rate limits requests

exports.getDelay = function () {
  if (lastRequest === null) {
    lastRequest = Date.now();
    return 0;
  }

  if (Date.now - lastRequest > 1000) {
    lastRequest = Date.now();
    return 0;
  }

  var delay = Date.now() - lastRequest + 200;
  console.log('throttling ' + delay);
  lastRequest = Date.now() + delay;
  return delay;
};

exports.fetchStatement = function (url, done) {
  setTimeout(function () {
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
  }, exports.getDelay());
};

exports.parseStatement = function (html, report, done) {

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
      done(null, report);
    }
  }, {decodeEntities: true});
  parser.write(html);
  parser.end();
};

exports.getIncomeStatement = function (args, done) {
  exports.fetchIncomeStatement(args, function (err, html) {
    exports.parseIncomeStatement(html, done);
  });
};

exports.fetchIncomeStatement = function (args, done) {

  var url = 'http://finance.yahoo.com/q/is?s=' + args.symbol;
  if (args.period === 'annual') {
    url += '&annual';
  }

  exports.fetchStatement(url, done);
};

exports.parseIncomeStatement = function (html, done) {

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

  exports.parseStatement(html, report, done);
};


exports.getBalanceSheet = function (args, done) {
  exports.fetchBalanceSheet(args, function (err, html) {
    exports.parseBalanceSheet(html, done);
  });
};

exports.fetchBalanceSheet = function (args, done) {

  var url = 'http://finance.yahoo.com/q/bs?s=' + args.symbol;
  if (args.period === 'annual') {
    url += '&annual';
  }

  exports.fetchStatement(url, done);
};

exports.parseBalanceSheet = function (html, done) {

  var report = {
    'Period Ending': [],

    // Current Assets
    'Cash And Cash Equivalents': [],
    'Short Term Investments': [],
    'Net Receivables': [],
    'Inventory': [],
    'Other Current Assets': [],
    'Total Current Assets': [],

    'Long Term Investments': [],
    'Property Plant and Equipment': [],
    'Goodwill': [],
    'Intangible Assets': [],
    'Accumulated Amortization': [],
    'Other Assets': [],
    'Deferred Long Term Asset Charges': [],
    'Total Assets': [],

    // Liabilities
    'Accounts Payable': [],
    'Short/Current Long Term Debt': [],
    'Other Current Liabilities': [],
    'Total Current Liabilities': [],
    'Long Term Debt': [],
    'Other Liabilities': [],
    'Deferred Long Term Liability Charges': [],
    'Minority Interest': [],
    'Negative Goodwill': [],
    'Total Liabilities': [],

    'Misc Stocks Options Warrants': [],
    'Redeemable Preferred Stock': [],
    'Preferred Stock': [],
    'Common Stock': [],
    'Retained Earnings': [],
    'Treasury Stock': [],
    'Capital Surplus': [],
    'Other Stockholder Equity': [],
    'Total Stockholder Equity': [],

    'Net Tangible Assets': [],
  };

  exports.parseStatement(html, report, done);
};


exports.getCashFlow = function (args, done) {
  exports.fetchCashFlow(args, function (err, html) {
    exports.parseCashFlow(html, done);
  });
};

exports.fetchCashFlow = function (args, done) {

  var url = 'http://finance.yahoo.com/q/cf?s=' + args.symbol;
  if (args.period === 'annual') {
    url += '&annual';
  }

  exports.fetchStatement(url, done);
};

exports.parseCashFlow = function (html, done) {

  var report = {
    'Period Ending': [],

    'Net Income': [],

    // Operating Activities, Cash Flows Provided By or Used In
    'Depreciation': [],
    'Adjustments To Net Income': [],
    'Changes In Accounts Receivables': [],
    'Changes In Liabilities': [],
    'Changes In Inventories': [],
    'Changes In Other Operating Activities': [],
    'Total Cash Flow From Operating Activities': [],

    // Investing Activities, Cash Flows Provided By or Used In
    'Capital Expenditures': [],
    'Investments': [],
    'Other Cash flows from Investing Activities': [],
    'Total Cash Flows From Investing Activities': [],

    // Financing Activities, Cash Flows Provided By or Used In
    'Dividends Paid': [],
    'Sale Purchase of Stock': [],
    'Net Borrowings': [],
    'Other Cash Flows from Financing Activities': [],
    'Total Cash Flows From Financing Activities': [],
    'Effect Of Exchange Rate Changes': [],
    'Change In Cash and Cash Equivalents': [],
  };

  exports.parseStatement(html, report, done);
};