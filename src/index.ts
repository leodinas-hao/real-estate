import * as File from 'fs';
import * as CsvWriter from 'json2csv';
import * as _ from 'lodash';
import * as QryString from 'qs';
import * as Request from 'request';

function get(i: number) {
  const size = 50;
  const qs = {
    channel: 'sold',
    page: i,
    pageSize: size,
    sortType: 'sold-date-desc',
    localities: [{
      searchLocation: 'hoppers crossing, vic 3029',
    }, {
      searchLocation: 'werribee, vic 3030',
    }],
    filters: {
      'propertyTypes': ['house'],
      'surroundingSuburbs': false,
      'excludeNoSalePrice': true,
      'ex-under-contract': false,
      'furnished': false,
    },
  };
  const opts = {
    url: `https://services.realestate.com.au/services/listings/search`,
    json: true,
    strictSSL: false,
    method: 'GET',
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36',
    },
    qs: {
      query: JSON.stringify(qs),
    },
  };
  return new Promise<any[]>((resolve, reject) => {
    Request(opts, (err, response, body) => {
      console.log(`-->Loaded page ${i}`);
      if (err) {
        reject(err);
      } else {
        resolve(body.tieredResults[0].results.map((val) => {
          return {
            streetAddress: val.address.streetAddress,
            suburb: val.address.suburb,
            postcode: val.address.postcode,
            latitude: val.address.location ? val.address.location.latitude : 'NULL',
            longitude: val.address.location ? val.address.location.longitude : 'NULL',
            constructionStatus: val.constructionStatus,
            dateSold: val.dateSold.value,
            bathrooms: val.features.general.bathrooms,
            bedrooms: val.features.general.bedrooms,
            parkingSpaces: val.features.general.parkingSpaces,
            landSize: val.landSize ? val.landSize.displayApp : 'NULL',
            price: val.price.display,
            status: val.status.type,
          };
        }));
      }
    });
  });
}

const pages = [];
for (let i = 1; i < 38; i++) {
  pages.push(get(i));
}

Promise.all(pages).then((values) => {
  const results = _.flatten(values);
  const csv = CsvWriter.parse(results);
  File.writeFile(`${Date.now()}.csv`, csv, (err) => {
    console.log(`${err ? err : '++Completed.'}`);
  });
});
