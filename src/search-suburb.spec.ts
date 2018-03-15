import { assert } from 'chai';
import { pending, suite, test } from 'mocha-typescript';

import { searchSuburb } from './search-suburb';

@suite('searchSuburb')
class SearchSuburbTest {
  @test('search Box Hill')
  public async searchBoxHill() {
    const term = 'box hill';
    const results = await searchSuburb(term);
    assert.isNotNull(results);
    assert.isArray(results);
    assert.isAtLeast(results.length, 1);
  }

  @test('search Unknown')
  public async searchUnknown() {
    const term = 'unknown';
    const results = await searchSuburb(term);
    assert.isNotNull(results);
    assert.isArray(results);
    assert.isEmpty(results);
  }
}
