import { describe, it, expect } from 'vitest';
import { deepMerge } from './deepMerge';

describe('deepMerge', () => {
  it('merges flat objects with rightmost priority', () => {
    const result = deepMerge({ a: 1 }, { a: 2, b: 3 });
    expect(result).toEqual({ a: 2, b: 3 });
  });

  it('merges nested objects deeply', () => {
    const result = deepMerge(
      { a: { b: 1, c: 2 } },
      { a: { b: 3, d: 4 } }
    );
    expect(result).toEqual({ a: { b: 3, c: 2, d: 4 } });
  });

  it('overwrites arrays instead of merging them', () => {
    const result = deepMerge(
      { a: [1, 2], b: { c: [3, 4] } },
      { a: [5], b: { c: [6] } }
    );
    expect(result).toEqual({ a: [5], b: { c: [6] } });
  });

  it('handles primitive overwrites correctly', () => {
    const result = deepMerge(
      { a: { b: 1 } },
      { a: 5 }
    );
    expect(result).toEqual({ a: 5 });
  });

  it('returns non-object when passed a primitive last', () => {
    const result = deepMerge({ a: 1 }, 5);
    expect(result).toBe(5);
  });

  it('handles merging with undefined and null safely', () => {
    const result = deepMerge(
      { a: { b: 1 } },
      undefined,
      null,
      { a: { c: 2 } }
    );
    expect(result).toEqual({ a: { b: 1, c: 2 } });
  });

  it('handles empty inputs', () => {
    const result = deepMerge();
    expect(result).toEqual({});
  });
});

describe('deepMerge - special cases', () => {
  it('overwrites Date objects', () => {
    const date1 = new Date('2020-01-01');
    const date2 = new Date('2021-01-01');

    const result = deepMerge({ date: date1 }, { date: date2 });
    expect(result.date).toBe(date2);
  });

  it('overwrites Map objects', () => {
    const map1 = new Map([['a', 1]]);
    const map2 = new Map([['b', 2]]);

    const result = deepMerge({ map: map1 }, { map: map2 });
    expect(result.map).toBe(map2);
  });

  it('overwrites Set objects', () => {
    const set1 = new Set([1, 2]);
    const set2 = new Set([3, 4]);

    const result = deepMerge({ set: set1 }, { set: set2 });
    expect(result.set).toBe(set2);
  });

  it('overwrites functions', () => {
    const fn1 = () => 1;
    const fn2 = () => 2;

    const result = deepMerge({ fn: fn1 }, { fn: fn2 });
    expect(result.fn).toBe(fn2);
    expect(result.fn()).toBe(2);
  });

  it('overwrites class instances', () => {
    class Example { x = 1 }
    const obj1 = { instance: new Example() };
    const obj2 = { instance: { y: 2 } };

    const result = deepMerge(obj1, obj2);
    expect(result.instance).toEqual({ y: 2 });
  });
});
