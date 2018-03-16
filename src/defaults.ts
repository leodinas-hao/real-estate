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
};
