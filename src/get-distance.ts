import * as File from 'fs';
import * as Distance from 'google-distance';

function distance(address): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    Distance.get({ origins: [address], destinations: ['Werribee Train Station, Werribee VIC 3030', 'Hoppers Crossing Station, Hoppers Crossing VIC 3029'] }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.map((r) => {
          return r.distance;
        }).join(';'));
      }
    });
  });
}

async function main() {
  let output = '';
  const addresses = File.readFileSync('addresses.txt').toString().split(/\r?\n/);
  let count = 0;
  for (const address of addresses) {
    console.log(`Loading ${count++} of ${addresses.length}`);
    try {
      const dis = await distance(address);
      output = output + `${address};${dis}\r\n`;
    } catch {
      output = output + `${address}\r\n`;
    }
  }
  File.writeFileSync(`${Date.now()}.txt`, output);
}

// main().then(() => {
//   console.log('completed');
// });
