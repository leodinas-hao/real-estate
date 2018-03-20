import * as Bluebird from 'bluebird';
global.Promise = Bluebird;

export interface Suburb {
  state: string;  // 'NSW' | 'VIC' | 'QLD' | 'WA' | 'SA' | 'ACT' | 'TAS' | 'NT'
  name: string;
  postcode: string;
}

export const defaults = {
  searchSuburb: { // request for searching suburbs
    method: 'GET',
    url: 'https://suggest.realestate.com.au/smart-suggest',
    qs: {
      query: undefined, // search term
      n: undefined, // number of returns
      regions: false,
      src: 'rui',
    },
    json: true,
    strictSSL: false,
  },
  investStats: {  // request for getting investor stats
    method: 'GET',
    url: 'https://investor-api.realestate.com.au/states/${state}/suburbs/${suburb}/postcodes/${postcode}.json',
    json: true,
    strictSSL: false,
  },
  investTrend: {
    method: 'GET',
    url: 'https://investor-api.realestate.com.au/states/${state}/suburbs/${suburb}/postcodes/${postcode}/sold_trend_data.json',
    json: true,
    strictSSL: false,
  },
  soldStats: {
    method: 'GET',
    url: 'https://services.realestate.com.au/services/listings/search',
    json: true,
    strictSSL: false,
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36',
    },
    qs: {
      query: undefined,
    },
  },
};
