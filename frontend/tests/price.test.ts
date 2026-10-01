import assert from 'node:assert/strict';
import { test } from 'node:test';
import { pricePer10ml } from '../src/price.ts';

test('묶음 전체 가격을 10ml당 가격으로 환산한다', () => {
  assert.equal(pricePer10ml(4, 500, 12000), 60);
  assert.equal(pricePer10ml(6, 355, 12900), 60.56);
  assert.equal(pricePer10ml(8, 485, 19900), 51.29);
});

test('유효하지 않은 가격이나 용량은 계산하지 않는다', () => {
  assert.throws(() => pricePer10ml(4, 500, 0), RangeError);
  assert.throws(() => pricePer10ml(4, 0, 12000), RangeError);
});
