import * as _ from 'lodash';
import * as Request from 'request';

import { defaults, Suburb } from './defaults';

export function investTrend(
  suburb: Suburb,
  propertyType: 'HOUSE' | 'UNIT' = 'HOUSE',
  bedrooms: '0' | '1' | '2' | '3' | '4' | '5+' | 'ALL' = 'ALL'): Promise<any> {
  // prepare params
  suburb.name = suburb.name.toUpperCase();  // upper case suburb name
  const url = _.template(defaults.investTrend.url)({
    state: suburb.state,
    suburb: encodeURIComponent(suburb.name),
    postcode: suburb.postcode,
  });
  const opts = _.merge({}, defaults.investTrend, { url });
  const path = `property_type.${propertyType}.bedrooms.${bedrooms}.yearly`;

  return new Promise<Suburb[]>((resolve, reject) => {
    Request(opts, (err, response, body) => {
      if (err) {
        reject(err);
      } else {
        const trend = [];
        _.forIn(_.get(body, path), (val, key) => {
          trend.push({
            year: key.substr(0, 4),
            value: val.value,
            count: val.count,
          });
        });
        resolve(trend);
      }
    });
  });
}
