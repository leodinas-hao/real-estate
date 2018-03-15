import * as _ from 'lodash';
import * as Request from 'request';

import { defaults, Suburb } from './defaults';

export function searchSuburb(term: string, limit?: number): Promise<Suburb[]> {
  const opts = _.merge({}, defaults.requests.search, { qs: { query: term, n: limit } });

  return new Promise<Suburb[]>((resolve, reject) => {
    Request(opts, (err, response, body) => {
      if (err) {
        reject(err);
      } else {
        resolve(body.suggestions.map((s) => {
          return {
            state: s.subdivision,
            name: s.locality,
            postcode: s.postcode,
          };
        }));
      }
    });
  });
}
