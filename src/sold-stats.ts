import * as File from 'fs';
import * as CsvWriter from 'json2csv';
import * as _ from 'lodash';
import * as Request from 'request';

import { defaults } from './defaults';

// e.g. query object as below:
// {
//   channel: 'sold',
//   page: 1,
//   pageSize: 50,
//   sortType: 'sold-date-desc',
//   localities: [{
//     searchLocation: 'hoppers crossing, vic 3029',
//   }, {
//     searchLocation: 'werribee, vic 3030',
//   }],
//   filters: {
//     'propertyTypes': ['house'],
//     'surroundingSuburbs': false,
//     'excludeNoSalePrice': true,
//     'ex-under-contract': false,
//     'furnished': false,
//   },
// }

export function soldStats(localities: string[], page = 1, pageSize = 50, filters?: any): Promise<any[]> {
  const query = {
    channel: 'sold',
    page: 1,
    pageSize: 50,
    sortType: 'sold-date-desc',
    localities: undefined,
    filters: {
      'propertyTypes': ['house'],
      'surroundingSuburbs': false,
      'excludeNoSalePrice': true,
      'ex-under-contract': false,
      'furnished': false,
    },
  };
  _.merge(query, {
    page,
    pageSize,
    localities: localities.map((l) => ({ searchLocation: l })),
    filters,
  });
  const opts = _.merge({}, defaults.soldStats, { qs: { query: JSON.stringify(query) } });

  return new Promise<any[]>((resolve, reject) => {
    Request(opts, (err, response, body) => {
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

export async function soldStatsBulkload(localities: string[], pages = 40, filters?: any) {
  const jobs = [];
  for (let i = 1; i <= pages; i++) {
    jobs.push(soldStats(localities, i, 50, filters));
  }
  const values = await Promise.all(jobs);
  const results = _.flatten(values);
  const csv = CsvWriter.parse(results);
  await Promise.promisify(File.writeFile)(`${Date.now()}.csv`, csv);
}

// soldStatsBulkload(['hoppers crossing, vic 3029', 'werribee, vic 3030']).then(() => {
//   console.log('Mission Completed.');
// });
