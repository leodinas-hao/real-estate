import * as CsvReader from 'csvtojson';
import * as File from 'fs';
import * as CsvWriter from 'json2csv';
import * as _ from 'lodash';
import * as Path from 'path';
import { Suburb } from './defaults';
import { investStats } from './invest-stats';
import { investTrend } from './invest-trend';

function readCsv(file: string): Promise<Suburb[]> {
  const suburbs: Suburb[] = [];
  return new Promise<Suburb[]>((resolve, reject) => {
    CsvReader()
      .fromFile(file)
      .on('json', (obj) => {
        suburbs.push({ name: obj.name, state: obj.state, postcode: obj.postcode });
      })
      .on('done', async (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(suburbs);
        }
      });
  });
}

function writeCsv(arr: any[], file: string): Promise<void> {
  const csv = CsvWriter.parse(arr);
  return new Promise<void>((resolve, reject) => {
    File.writeFile(file, csv, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

async function main() {
  const file = Path.resolve('Victoria-Postcodes.csv');
  console.log('Reading csv file...');
  const suburbs = await readCsv(file);  // load suburbs from csv
  console.log(`Total of ${suburbs.length} suburbs loaded.`);
  const outputs = [];
  console.log('Extracting suburb profiles...');
  let count = 0;
  for (const suburb of suburbs) {
    console.log(`Loading ${suburb.name}: ${count} out of ${suburbs.length}`);
    const [stats, trend] = await Promise.all([investStats(suburb), investTrend(suburb)]);
    if (stats && trend.length > 0) {
      outputs.push(_.merge({}, stats, trend.reduce((acc, cur) => {
        acc[cur.year] = cur.value;
        return acc;
      }, {})));
    }
    count++;
  }
  console.log('Writing csv file...');
  await writeCsv(outputs, Path.resolve(`${Date.now()}.csv`));
}

main().then(() => {
  console.log('Mission completed!');
});
