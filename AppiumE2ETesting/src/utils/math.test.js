import { add, subtract, multiply } from './math';

describe('Math utilities', () => {
  test('adds numbers correctly', () => {
    expect(add(1, 2)).toBe(3);
    expect(add(-1, 5)).toBe(4);
  });

  test('subtracts numbers correctly', () => {
    expect(subtract(5, 2)).toBe(3);
    expect(subtract(10, 10)).toBe(0);
  });

  test('multiplies numbers correctly', () => {
    expect(multiply(3, 4)).toBe(12);
    expect(multiply(0, 10)).toBe(0);
  });
});