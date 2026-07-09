import { describe, expect, test } from 'vitest';

import { shallowDelta } from './index.ts';

describe('shallow delta', () => {
  test('it should return an empty object when there are no differences', () => {
    const obj1 = { id: 'node_1', label: 'Alpha', x: 10, y: 20 };
    const obj2 = { id: 'node_1', label: 'Alpha', x: 10, y: 20 };

    const result = shallowDelta(obj1, obj2);

    expect(result).toEqual({});
  });

  test('it should return only the properties that changed with values from the second object', () => {
    const obj1 = { id: 'node_1', label: 'Alpha', x: 10, y: 20 };
    const obj2 = { id: 'node_1', label: 'Beta', x: 15, y: 20 };

    const result = shallowDelta(obj1, obj2);

    expect(result).toEqual({
      label: 'Beta',
      x: 15,
    });
  });

  test('it should capture new properties added to the second object', () => {
    const obj1 = { id: 'edge_1', weight: 5 } as Record<string, any>;
    const obj2 = { id: 'edge_1', weight: 5, color: 'red' };

    const result = shallowDelta(obj1, obj2);

    expect(result).toEqual({
      color: 'red',
    });
  });

  test('it should distinguish between falsy values like null, undefined, and 0', () => {
    const obj1 = { weight: 0, label: 'A', group: null };
    const obj2 = { weight: undefined, label: 'A', group: 0 };

    const result = shallowDelta(obj1, obj2 as Record<string, any>);

    expect(result).toEqual({
      weight: undefined,
      group: 0,
    });
  });

  test('it should perform strict shallow equality comparisons', () => {
    const obj1 = { data: { score: 10 } };
    // structurally identical, but different reference
    const obj2 = { data: { score: 10 } };

    const result = shallowDelta(obj1, obj2);

    // since it's only shallow, reference mismatches are treated as changes
    expect(result).toEqual({
      data: { score: 10 },
    });
  });
});
