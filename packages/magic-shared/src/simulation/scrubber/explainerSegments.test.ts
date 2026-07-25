import { getValue } from '@core/utils/maybeGetter/index';
import { describe, expect, test, vi } from 'vitest';

import { Explainer, ExplainerHighlight } from '../types.ts';

vi.mock('../../theme/node/index.ts', () => ({
  createNodeIdThemer: () => ({
    themer: {
      activate: vi.fn(),
      deactivate: vi.fn(),
    },
    nodeId: { value: undefined },
  }),
  useNodeStyles: () => ({
    styles: { value: { border: { color: undefined } } },
    dispose: vi.fn(),
  }),
}));

const { explainerSegments } = await import('./explainerSegments.ts');

const graph = {
  isNode: (_id: string): boolean => true,
  nodeLabel: {
    get: (id: string) => `Label ${id}`,
  },
} as Parameters<typeof explainerSegments>[0];

const highlight = (
  overrides: Partial<ExplainerHighlight> = {},
): ExplainerHighlight => ({
  activate: vi.fn(),
  deactivate: vi.fn(),
  ...overrides,
});

describe(explainerSegments, () => {
  test('returns an empty array when explainer is undefined', () => {
    expect(explainerSegments(graph, undefined)).toEqual([]);
  });

  test('returns a single unhighlighted segment when there are no brackets', () => {
    const explainer: Explainer = {
      content: 'no brackets here',
      highlights: [],
    };

    expect(explainerSegments(graph, explainer)).toEqual([
      {
        id: expect.any(String),
        text: 'no brackets here',
        highlight: undefined,
      },
    ]);
  });

  test('splits leading, highlighted, and trailing text', () => {
    const h = highlight();
    const explainer: Explainer = {
      content: 'Looking at [Node A] now',
      highlights: [h],
    };

    const segments = explainerSegments(graph, explainer);

    expect(segments.map((s) => getValue(s.text))).toEqual([
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

    const segments = explainerSegments(graph, explainer);

    expect(segments.map((s) => getValue(s.text))).toEqual([
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

    const segments = explainerSegments(graph, explainer);

    expect(segments.map((s) => getValue(s.text))).toEqual([
      'Start',
      ' middle ',
      'End',
    ]);
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

    const segments = explainerSegments(graph, explainer);

    expect(segments.map((s) => getValue(s.text))).toEqual(['Foo', 'Bar']);
    expect(segments[0].highlight).toBe(h1);
    expect(segments[1].highlight).toBe(h2);
  });

  test('throws when there are more bracketed segments than highlights', () => {
    const explainer: Explainer = {
      content: '[Foo] and [Bar]',
      highlights: [highlight()],
    };

    expect(() => explainerSegments(graph, explainer)).toThrow();
  });

  test('resolves content when it is a getter function', () => {
    const explainer: Explainer = {
      content: () => 'no brackets here',
      highlights: [],
    };

    expect(explainerSegments(graph, explainer)).toEqual([
      {
        id: expect.any(String),
        text: 'no brackets here',
        highlight: undefined,
      },
    ]);
  });

  test('resolves highlights when it is a getter function', () => {
    const h = highlight();
    const explainer: Explainer = {
      content: 'Looking at [Node A] now',
      highlights: () => [h],
    };

    const segments = explainerSegments(graph, explainer);

    expect(segments.map((s) => getValue(s.text))).toEqual([
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

    const segments = explainerSegments(graph, explainer);

    expect(segments.map((s) => getValue(s.text))).toEqual([
      'Looking at ',
      'Node A',
      ' now',
    ]);
    expect(segments[1].highlight).toBe(h);
  });

  test('resolves a curly-braced node id to its label and auto-highlights it', () => {
    const explainer: Explainer = {
      content: 'This is Node {node-a} and here is a [highlight]',
      highlights: [highlight()],
    };

    const segments = explainerSegments(graph, explainer);

    expect(segments.map((s) => getValue(s.text))).toEqual([
      'This is Node ',
      'Label node-a',
      ' and here is a ',
      'highlight',
    ]);
    expect(segments[1].highlight).toBeDefined();
    expect(segments[3].highlight).toBeDefined();
  });

  test('handles multiple curly-braced node ids without consuming bracket highlights', () => {
    const h = highlight();
    const explainer: Explainer = {
      content: 'Comparing {node-a} to {node-b} for [Reason]',
      highlights: [h],
    };

    const segments = explainerSegments(graph, explainer);

    expect(segments.map((s) => getValue(s.text))).toEqual([
      'Comparing ',
      'Label node-a',
      ' to ',
      'Label node-b',
      ' for ',
      'Reason',
    ]);
    expect(segments.at(-1)?.highlight).toBe(h);
  });

  test('defaults to an empty array when highlights is undefined', () => {
    const explainer: Explainer = {
      content: 'no brackets here',
    };

    expect(explainerSegments(graph, explainer)).toEqual([
      {
        id: expect.any(String),
        text: 'no brackets here',
        highlight: undefined,
      },
    ]);
  });
});
