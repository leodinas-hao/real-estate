import * as _ from 'lodash';
import * as Request from 'request';

import { defaults, Suburb } from './defaults';

export function investStats(
  suburb: Suburb,
  propertyType: 'HOUSE' | 'UNIT' = 'HOUSE',
  bedrooms: '0' | '1' | '2' | '3' | '4' | '5+' | 'ALL' = 'ALL'): Promise<any> {
  // prepare params
  suburb.name = suburb.name.toUpperCase();  // upper case suburb name
  const url = _.template(defaults.investStats.url)({
    state: suburb.state,
    suburb: encodeURIComponent(suburb.name),
    postcode: suburb.postcode,
  });
  const opts = _.merge({}, defaults.investStats, { url });
  const path = `${suburb.name}-${suburb.postcode}.property_types.${propertyType}.bedrooms.${bedrooms}.investor_metrics`;

  return new Promise<Suburb[]>((resolve, reject) => {
    Request(opts, (err, response, body) => {
      if (err) {
        reject(err);
      } else {
        resolve(_.merge({}, _.get(body, path), suburb));
      }
    });
  });
}
