import { assert } from 'chai';
import { pending, suite, test } from 'mocha-typescript';

import { Suburb } from './defaults';
import { investTrend } from './invest-trend';

@suite('investTrend')
class InvestTrendTest {
  @test('get invest trend for Box Hill')
  public async investTrendBoxHill() {
    const suburb: Suburb = {
      state: 'VIC',
      name: 'Box Hill',
      postcode: '3128',
    };
    const trend = await investTrend(suburb);
    assert.isNotEmpty(trend);
  }

  @test('get invest trend for UNKNOWN')
  public async investSTrendUnknown() {
    const suburb: Suburb = {
      state: 'VIC',
      name: 'unknown',
      postcode: 'unknown',
    };
    const trend = await investTrend(suburb);
    assert.isEmpty(trend);
  }
}
