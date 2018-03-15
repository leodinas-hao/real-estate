import * as Bluebird from 'bluebird';
global.Promise = Bluebird;

export interface Suburb {
  state: string;
  name: string;
  postcode: string;
}

export const defaults = {
  requests: {
    search: { // request for searching suburbs
      method: 'GET',
      url: 'https://suggest.realestate.com.au/smart-suggest',
      qs: {
        query: undefined, // search term
        n: 1,
        regions: false,
        src: 'rui',
      },
      json: true,
      strictSSL: false,
    },
    stats: {  // request for getting investor stats
      method: 'GET',
      url: 'https://investor-api.realestate.com.au/states/${state}/suburbs/${name}/postcodes/${postcode}.json',
      json: true,
      strictSSL: false,
    },
  },
  options: {
    suburbs: [{
      state: 'VIC',
      name: 'BOX HILL',
      postcode: '3128',
    }],
    propertyType: 'HOUSE',
    bedrooms: 'ALL',
  },
};
