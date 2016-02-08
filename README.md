[![Build Status](https://travis-ci.org/msimerson/node-finance-statement-scraper.svg?branch=master)](https://travis-ci.org/msimerson/node-finance-statement-scraper)
[![codecov.io](https://codecov.io/github/msimerson/node-finance-statement-scraper/coverage.svg?branch=master)](https://codecov.io/github/msimerson/node-finance-statement-scraper?branch=master)


# node-finance-statement-scraper

Scrape Financial Statements (Balance Sheet, Profit & Loss, Cash Flow) from online providers.

Includes a built-in throttle that limits requests to providers, to reduce the likelihood of getting blacklisted. Be a thoughtful netizen!

# Planned features

* support for additional providers
    * [Edgar](https://www.sec.gov/edgar/searchedgar/webusers.htm)
    * [Daily Finance](http://www.dailyfinance.com)
    * [Google](https://www.google.com/finance)
* an abstraction layer, that reduces differences between providers

# Example results

## Income Statement

```json
{ 'Period Ending': [ 'Dec 31, 2014', 'Dec 31, 2013', 'Dec 31, 2012' ],
  'Total Revenue': [ '3,198,356', '2,013,496', '413,256' ],
  'Cost of Revenue': [ '2,316,685', '1,557,234', '383,189' ],
  'Gross Profit': [ '881,671', '456,262', '30,067' ],
  'Research Development': [ '464,700', '231,976', '273,978' ],
  'Selling General and Administrative': [ '603,660', '285,569', '150,372' ],
  'Non Recurring': [ '-', '-', '-' ],
  Others: [ '-', '-', '-' ],
  'Total Operating Expenses': [ '-', '-', '-' ],
  'Operating Income or Loss': [ '(186,689)', '(61,283)', '(394,283)' ],
  'Total Other Income/Expenses Net': [ '2,939', '22,791', '(1,540)' ],
  'Earnings Before Interest And Taxes': [ '(183,750)', '(38,492)', '(395,823)' ],
  'Interest Expense': [ '100,886', '32,934', '254' ],
  'Income Before Tax': [ '(284,636)', '(71,426)', '(396,077)' ],
  'Income Tax Expense': [ '9,404', '2,588', '136' ],
  'Minority Interest': [ '-', '-', '-' ],
  'Net Income From Continuing Ops': [ '(294,040)', '(74,014)', '(396,213)' ],
  'Discontinued Operations': [ '-', '-', '-' ],
  'Extraordinary Items': [ '-', '-', '-' ],
  'Effect Of Accounting Changes': [ '-', '-', '-' ],
  'Other Items': [ '-', '-', '-' ],
  'Net Income': [ '(294,040)', '(74,014)', '(396,213)' ],
  'Preferred Stock And Other Adjustments': [ '-', '-', '-' ],
  'Net Income Applicable To Common Shares': [ '(294,040)', '(74,014)', '(396,213)' ]
}
```

## Balance Sheet

```json
{ 'Period Ending': [ 'Dec 31, 2014', 'Dec 31, 2013', 'Dec 31, 2012' ],
  'Cash And Cash Equivalents': [ '1,923,660', '848,901', '220,984' ],
  'Short Term Investments': [ '-', '-', '-' ],
  'Net Receivables': [ '226,604', '49,109', '26,842' ],
  Inventory: [ '953,675', '340,355', '268,504' ],
  'Other Current Assets': [ '94,718', '27,574', '8,438' ],
  'Total Current Assets': [ '3,198,657', '1,265,939', '524,768' ],
  'Long Term Investments': [ '-', '-', '-' ],
  'Property Plant and Equipment': [ '2,596,011', '1,120,919', '562,300' ],
  Goodwill: [ '-', '-', '-' ],
  'Intangible Assets': [ '-', '-', '-' ],
  'Accumulated Amortization': [ '-', '-', '-' ],
  'Other Assets': [ '54,583', '30,072', '27,122' ],
  'Deferred Long Term Asset Charges': [ '-', '-', '-' ],
  'Total Assets': [ '5,849,251', '2,416,930', '1,114,190' ],
  'Accounts Payable': [ '1,046,830', '412,221', '343,180' ],
  'Short/Current Long Term Debt': [ '611,098', '7,904', '55,206' ],
  'Other Current Liabilities': [ '449,238', '255,035', '140,722' ],
  'Total Current Liabilities': [ '2,107,166', '675,160', '539,108' ],
  'Long Term Debt': [ '1,818,785', '598,974', '411,460' ],
  'Other Liabilities': [ '661,123', '294,496', '35,862' ],
  'Deferred Long Term Liability Charges': [ '292,271', '181,180', '3,060' ],
  'Minority Interest': [ '-', '-', '-' ],
  'Negative Goodwill': [ '-', '-', '-' ],
  'Total Liabilities': [ '4,879,345', '1,749,810', '989,490' ],
  'Misc Stocks Options Warrants': [ '58,196', '-', '-' ],
  'Redeemable Preferred Stock': [ '-', '-', '-' ],
  'Preferred Stock': [ '-', '-', '-' ],
  'Common Stock': [ '126', '123', '115' ],
  'Retained Earnings': [ '(1,433,682)', '(1,139,620)', '(1,065,606)' ],
  'Treasury Stock': [ '-', '-', '-' ],
  'Capital Surplus': [ '2,345,266', '1,806,617', '1,190,191' ],
  'Other Stockholder Equity': [ '-', '-', '-' ],
  'Total Stockholder Equity': [ '911,710', '667,120', '124,700' ],
  'Net Tangible Assets': [ '911,710', '667,120', '124,700' ]
}
```

## Cash Flow

```json
{ 'Period Ending': [ 'Dec 31, 2014', 'Dec 31, 2013', 'Dec 31, 2012' ],
  'Net Income': [ '(294,040)', '(74,014)', '(396,213)' ],
  Depreciation: [ '301,665', '120,784', '28,825' ],
  'Adjustments To Net Income': [ '191,863', '69,076', '58,631' ],
  'Changes In Accounts Receivables': [ '(183,658)', '(21,705)', '(17,303)' ],
  'Changes In Liabilities': [ '1,042,227', '649,191', '256,332' ],
  'Changes In Inventories': [ '(1,050,264)', '(460,561)', '(194,726)' ],
  'Changes In Other Operating Activities': [ '(65,130)', '(17,967)', '639' ],
  'Total Cash Flow From Operating Activities': [ '(57,337)', '264,804', '(263,815)' ],
  'Capital Expenditures': [ '(969,885)', '(264,224)', '(239,228)' ],
  Investments: [ '(16,710)', '-', '25,008' ],
  'Other Cash flows from Investing Activities': [ '(3,849)', '14,807', '7,290' ],
  'Total Cash Flows From Investing Activities': [ '(990,444)', '(249,417)', '(206,930)' ],
  'Dividends Paid': [ '-', '-', '-' ],
  'Sale Purchase of Stock': [ '454,466', '613,724', '246,381' ],
  'Net Borrowings': [ '2,292,092', '199,238', '173,254' ],
  'Other Cash Flows from Financing Activities': [ '-', '-', '-' ],
  'Total Cash Flows From Financing Activities': [ '2,143,130', '635,422', '419,635' ],
  'Effect Of Exchange Rate Changes': [ '(35,525)', '(6,810)', '(2,266)' ],
  'Change In Cash and Cash Equivalents': [ '1,059,824', '643,999', '(53,376)' ]
}
```
