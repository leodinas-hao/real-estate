import { assert } from 'chai';
import { pending, suite, test } from 'mocha-typescript';

import { investStats } from './invest-stats';

@suite('investStats')
class InvestStatsTest {
  @test('get invest stats for Box Hill')
  public async investStatsBoxHill() {
    const suburb = {
      state: 'VIC',
      name: 'Box Hill',
      postcode: '3128',
    };
    const stats = await investStats(suburb, 'UNIT', '2');
    assert.isNotNull(stats);
  }

  @test('get invest stats for UNKNOWN')
  public async investStatsUnknown() {
    const suburb = {
      state: 'VIC',
      name: 'unknown',
      postcode: 'unknown',
    };
    const stats = await investStats(suburb);
    assert.isUndefined(stats);
  }
}
