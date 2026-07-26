import Fraction from 'fraction.js';
import { describe, expect, it } from 'vitest';

import { bellmanFord } from './bellman-ford.ts';
import { dijkstras } from './dijkstras.ts';
import { floydWarshall } from './floyd-warshall.ts';
import type { PathFindingFrame } from './frame.ts';

/** source, target, weight */
type EdgeSpec = [string, string, number];

/*
  the algorithms read three things off a graph and nothing else: the node list,
  the edge list, and whether it is directed. standing those up by hand keeps a
  shortest path test from needing a canvas to run on
*/
const makeGraph = (
  nodeIds: string[],
  edges: EdgeSpec[],
  directed = true,
): any => ({
  nodes: { value: nodeIds.map((id) => ({ id })) },
  edges: {
    value: edges.map(([source, target, weight], index) => ({
      id: `e${index}`,
      source,
      target,
      weight: new Fraction(weight),
    })),
  },
  metadata: { directed },
});

const collect = (run: (c: { add: (f: PathFindingFrame) => void }) => void) => {
  const frames: PathFindingFrame[] = [];
  run({ add: (frame) => frames.push(frame) });
  return frames;
};

const last = (frames: PathFindingFrame[]) => frames[frames.length - 1];

// a -1-> b -2-> d, a -4-> c -1-> d, so d is 3 via b and 5 via c
const DIAMOND: EdgeSpec[] = [
  ['a', 'b', 1],
  ['b', 'd', 2],
  ['a', 'c', 4],
  ['c', 'd', 1],
];

describe('dijkstras', () => {
  it('finds shortest distances on a directed diamond', () => {
    const graph = makeGraph(['a', 'b', 'c', 'd'], DIAMOND);
    const frames = collect(dijkstras(graph, 'a'));
    expect(last(frames).type).toBe('end');
    expect(last(frames).distances).toEqual({ a: 0, b: 1, c: 4, d: 3 });
    expect(last(frames).settledNodeIds).toHaveLength(4);
  });

  it('reports nodes nothing leads to', () => {
    const graph = makeGraph(['a', 'b', 'z'], [['a', 'b', 5]]);
    const frames = collect(dijkstras(graph, 'a'));
    const unreachable = frames.find((f) => f.type === 'unreachable');
    expect(unreachable && 'nodes' in unreachable && unreachable.nodes).toEqual([
      'z',
    ]);
    expect(last(frames).distances).toEqual({ a: 0, b: 5, z: undefined });
  });

  it('walks undirected edges both ways', () => {
    const graph = makeGraph(
      ['a', 'b', 'c'],
      [
        ['a', 'b', 2],
        ['c', 'b', 3],
      ],
      false,
    );
    const frames = collect(dijkstras(graph, 'a'));
    expect(last(frames).distances).toEqual({ a: 0, b: 2, c: 5 });
  });

  it('takes the cheaper of two parallel edges', () => {
    const graph = makeGraph(
      ['a', 'b'],
      [
        ['a', 'b', 9],
        ['a', 'b', 2],
      ],
    );
    const frames = collect(dijkstras(graph, 'a'));
    expect(last(frames).distances).toEqual({ a: 0, b: 2 });
  });
});

describe('bellmanFord', () => {
  it('agrees with dijkstra when weights are non negative', () => {
    const graph = makeGraph(['a', 'b', 'c', 'd'], DIAMOND);
    expect(last(collect(bellmanFord(graph, 'a'))).distances).toEqual({
      a: 0,
      b: 1,
      c: 4,
      d: 3,
    });
  });

  it('handles a negative edge dijkstra would get wrong', () => {
    // a->b 5, a->c 6, c->b -4, so b is really 2
    const graph = makeGraph(
      ['a', 'b', 'c'],
      [
        ['a', 'b', 5],
        ['a', 'c', 6],
        ['c', 'b', -4],
      ],
    );
    expect(last(collect(bellmanFord(graph, 'a'))).distances).toEqual({
      a: 0,
      b: 2,
      c: 6,
    });
  });

  it('stops early once a pass changes nothing', () => {
    const graph = makeGraph(['a', 'b', 'c', 'd'], DIAMOND);
    const frames = collect(bellmanFord(graph, 'a'));
    expect(frames.some((f) => f.type === 'pass-settled')).toBe(true);
  });

  it('calls out a negative cycle', () => {
    const graph = makeGraph(
      ['a', 'b', 'c'],
      [
        ['a', 'b', 1],
        ['b', 'c', -2],
        ['c', 'b', -2],
      ],
    );
    const frames = collect(bellmanFord(graph, 'a'));
    expect(frames.some((f) => f.type === 'negative-cycle')).toBe(true);
  });
});

describe('floydWarshall', () => {
  it('fills in every pair', () => {
    const graph = makeGraph(['a', 'b', 'c', 'd'], DIAMOND);
    const matrix = last(collect(floydWarshall(graph)))!.matrix!;
    expect(matrix.a).toEqual({ a: 0, b: 1, c: 4, d: 3 });
    expect(matrix.b).toEqual({ a: undefined, b: 0, c: undefined, d: 2 });
    expect(matrix.d).toEqual({
      a: undefined,
      b: undefined,
      c: undefined,
      d: 0,
    });
  });

  it('agrees with bellman ford from every source', () => {
    const graph = makeGraph(
      ['a', 'b', 'c'],
      [
        ['a', 'b', 5],
        ['a', 'c', 6],
        ['c', 'b', -4],
      ],
    );
    const matrix = last(collect(floydWarshall(graph)))!.matrix!;
    for (const source of ['a', 'b', 'c']) {
      const distances = last(collect(bellmanFord(graph, source))).distances;
      expect(matrix[source]).toEqual(distances);
    }
  });

  it('calls out a negative cycle', () => {
    const graph = makeGraph(
      ['a', 'b'],
      [
        ['a', 'b', 1],
        ['b', 'a', -3],
      ],
    );
    const frames = collect(floydWarshall(graph));
    expect(frames.some((f) => f.type === 'negative-cycle')).toBe(true);
  });
});
