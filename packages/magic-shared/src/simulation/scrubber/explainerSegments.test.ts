import { describe, expect, test, vi } from 'vitest';

import { Explainer, ExplainerHighlight } from '../types.ts';
import { explainerSegments } from './explainerSegments.ts';

const highlight = (
  overrides: Partial<ExplainerHighlight> = {},
): ExplainerHighlight => ({
  activate: vi.fn(),
  deactivate: vi.fn(),
  ...overrides,
});

describe(explainerSegments, () => {
  test('returns an empty array when explainer is undefined', () => {
    expect(explainerSegments(undefined)).toEqual([]);
  });

  test('returns a single unhighlighted segment when there are no brackets', () => {
    const explainer: Explainer = {
      content: 'no brackets here',
      highlights: [],
    };

    expect(explainerSegments(explainer)).toEqual([
      { text: 'no brackets here', highlight: undefined },
    ]);
  });

  test('splits leading, highlighted, and trailing text', () => {
    const h = highlight();
    const explainer: Explainer = {
      content: 'Looking at [Node A] now',
      highlights: [h],
    };

    const segments = explainerSegments(explainer);

    expect(segments.map((s) => s.text)).toEqual([
      'Looking at ',
      'Node A',
      ' now',
    ]);
    expect(segments[0].highlight).toBeUndefined();
    expect(segments[1].highlight).toBe(h);
    expect(segments[2].highlight).toBeUndefined();
  });

  test('handles multiple bracketed segments in order', () => {
    const h1 = highlight();
    const h2 = highlight();
    const explainer: Explainer = {
      content: '[Looking] [at] Node A',
      highlights: [h1, h2],
    };

    const segments = explainerSegments(explainer);

    expect(segments.map((s) => s.text)).toEqual([
      'Looking',
      ' ',
      'at',
      ' Node A',
    ]);
    expect(segments[0].highlight).toBe(h1);
    expect(segments[1].highlight).toBeUndefined();
    expect(segments[2].highlight).toBe(h2);
    expect(segments[3].highlight).toBeUndefined();
  });

  test('handles content that starts and ends with brackets', () => {
    const h1 = highlight();
    const h2 = highlight();
    const explainer: Explainer = {
      content: '[Start] middle [End]',
      highlights: [h1, h2],
    };

    const segments = explainerSegments(explainer);

    expect(segments.map((s) => s.text)).toEqual(['Start', ' middle ', 'End']);
    expect(segments[0].highlight).toBe(h1);
    expect(segments[1].highlight).toBeUndefined();
    expect(segments[2].highlight).toBe(h2);
  });

  test('handles adjacent bracketed segments with no text between them', () => {
    const h1 = highlight();
    const h2 = highlight();
    const explainer: Explainer = {
      content: '[Foo][Bar]',
      highlights: [h1, h2],
    };

    const segments = explainerSegments(explainer);

    expect(segments.map((s) => s.text)).toEqual(['Foo', 'Bar']);
    expect(segments[0].highlight).toBe(h1);
    expect(segments[1].highlight).toBe(h2);
  });

  test('throws when there are more bracketed segments than highlights', () => {
    const explainer: Explainer = {
      content: '[Foo] and [Bar]',
      highlights: [highlight()],
    };

    expect(() => explainerSegments(explainer)).toThrow();
  });

  test('resolves content when it is a getter function', () => {
    const explainer: Explainer = {
      content: () => 'no brackets here',
      highlights: [],
    };

    expect(explainerSegments(explainer)).toEqual([
      { text: 'no brackets here', highlight: undefined },
    ]);
  });

  test('resolves highlights when it is a getter function', () => {
    const h = highlight();
    const explainer: Explainer = {
      content: 'Looking at [Node A] now',
      highlights: () => [h],
    };

    const segments = explainerSegments(explainer);

    expect(segments.map((s) => s.text)).toEqual([
      'Looking at ',
      'Node A',
      ' now',
    ]);
    expect(segments[1].highlight).toBe(h);
  });

  test('resolves both content and highlights when both are getter functions', () => {
    const h = highlight();
    const explainer: Explainer = {
      content: () => 'Looking at [Node A] now',
      highlights: () => [h],
    };

    const segments = explainerSegments(explainer);

    expect(segments.map((s) => s.text)).toEqual([
      'Looking at ',
      'Node A',
      ' now',
    ]);
    expect(segments[1].highlight).toBe(h);
  });

  test('defaults to an empty array when highlights is undefined', () => {
    const explainer: Explainer = {
      content: 'no brackets here',
    };

    expect(explainerSegments(explainer)).toEqual([
      { text: 'no brackets here', highlight: undefined },
    ]);
  });
});
