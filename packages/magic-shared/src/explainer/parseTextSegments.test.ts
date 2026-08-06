import { describe, expect, test } from 'vitest';

import { parseTextSegments } from './parseTextSegments.ts';

describe(parseTextSegments, () => {
  test('returns a single unbracketed segment for plain text', () => {
    expect(parseTextSegments('no brackets here')).toEqual([
      { bracketType: undefined, text: 'no brackets here' },
    ]);
  });

  test('parses a square-bracketed segment', () => {
    expect(parseTextSegments('[Node A]')).toEqual([
      { bracketType: 'square', text: 'Node A' },
    ]);
  });

  test('parses a curly-bracketed segment', () => {
    expect(parseTextSegments('{node-a}')).toEqual([
      { bracketType: 'curly', text: 'node-a' },
    ]);
  });

  test('splits leading, bracketed, and trailing text', () => {
    expect(parseTextSegments('Looking at [Node A] now')).toEqual([
      { bracketType: undefined, text: 'Looking at ' },
      { bracketType: 'square', text: 'Node A' },
      { bracketType: undefined, text: ' now' },
    ]);
  });

  test('handles adjacent bracketed segments with no text between them', () => {
    expect(parseTextSegments('[Foo][Bar]')).toEqual([
      { bracketType: 'square', text: 'Foo' },
      { bracketType: 'square', text: 'Bar' },
    ]);
  });

  test('handles a mix of curly and square brackets', () => {
    expect(
      parseTextSegments('Comparing {node-a} to {node-b} for [Reason]'),
    ).toEqual([
      { bracketType: undefined, text: 'Comparing ' },
      { bracketType: 'curly', text: 'node-a' },
      { bracketType: undefined, text: ' to ' },
      { bracketType: 'curly', text: 'node-b' },
      { bracketType: undefined, text: ' for ' },
      { bracketType: 'square', text: 'Reason' },
    ]);
  });

  test('returns an empty array for an empty string', () => {
    expect(parseTextSegments('')).toEqual([]);
  });

  test('parses empty bracket contents', () => {
    expect(parseTextSegments('[]{}')).toEqual([
      { bracketType: 'square', text: '' },
      { bracketType: 'curly', text: '' },
    ]);
  });
});
