export const defaults = {
  requests: {
    suggest: {
      method: 'GET',
      url: 'https://suggest.realestate.com.au/smart-suggest',
      qs: {
        query: undefined, // search term
        n: 1,
        regions: false,
        src: 'rui',
      },
    },
    stats: {
      method: 'GET',
      url: 'https://investor-api.realestate.com.au/states/${state}/suburbs/${suburb}/postcodes/${postcode}.json',
    },
  },
  options: {
    location: [{
      state: 'VIC',
      suburb: 'BOX HILL',
      postcode: '3128',
    }],
    propertyType: 'HOUSE',
    bedrooms: 'ALL',
  },
};
