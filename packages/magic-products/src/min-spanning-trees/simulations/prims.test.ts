import Fraction from 'fraction.js';
import { describe, expect, it } from 'vitest';

import { prims } from './prims.ts';

/** source, target, weight. the weight is anything `new Fraction()` takes */
type EdgeSpec = [string, string, number | string];

/*
  prims only reads three things off a graph: the node list, the edge list
  (already carrying its weight, the way `graph.edges.value` really does), and
  whether it is directed. standing those up by hand keeps this from needing a
  canvas to run on, mirroring path-finding/simulations/algorithms.test.ts
*/
const makeGraph = (
  nodeIds: string[],
  edges: EdgeSpec[],
  directed = false,
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

const collect = <F>(run: (c: { add: (frame: F) => void }) => void) => {
  const frames: F[] = [];
  run({ add: (frame) => frames.push(frame) });
  return frames;
};

const last = <F>(frames: F[]) => frames[frames.length - 1];

describe('prims', () => {
  it('grows a minimum spanning tree from the start node', () => {
    // triangle: a-b 1, b-c 2, a-c 9 -> cheapest tree is a-b, b-c
    const graph = makeGraph(
      ['a', 'b', 'c'],
      [
        ['a', 'b', 1],
        ['b', 'c', 2],
        ['a', 'c', 9],
      ],
    );
    const frames = collect(prims(graph, 'a'));
    expect(last(frames).type).toBe('end');
    expect(last(frames).treeEdgeIds).toEqual(['e0', 'e1']);
    expect([...last(frames).treeNodeIds].sort()).toEqual(['a', 'b', 'c']);
  });

  it('takes the cheaper of two parallel edges', () => {
    const graph = makeGraph(
      ['a', 'b'],
      [
        ['a', 'b', 9],
        ['a', 'b', 2],
      ],
    );
    const frames = collect(prims(graph, 'a'));
    expect(last(frames).treeEdgeIds).toEqual(['e1']);
  });

  it('reports nodes the start node cannot reach', () => {
    const graph = makeGraph(['a', 'b', 'z'], [['a', 'b', 5]]);
    const frames = collect(prims(graph, 'a'));
    const unreachable = frames.find((f) => f.type === 'unreachable');
    expect(unreachable && 'nodes' in unreachable && unreachable.nodes).toEqual(
      ['z'],
    );
    expect([...last(frames).treeNodeIds].sort()).toEqual(['a', 'b']);
  });

  it('weighs the whole frontier at once rather than one edge at a time', () => {
    // a's frontier is every edge at once: a-b, a-c, a-d
    const graph = makeGraph(
      ['a', 'b', 'c', 'd'],
      [
        ['a', 'b', 5],
        ['a', 'c', 1],
        ['a', 'd', 4],
      ],
    );
    const frames = collect(prims(graph, 'a'));

    const considered = frames.find((f) => f.type === 'consider-edges');
    expect(considered && 'edges' in considered && considered.edges).toEqual([
      'e0',
      'e1',
      'e2',
    ]);

    const selected = frames.find((f) => f.type === 'select-edge');
    expect(selected && 'edge' in selected && selected.edge).toBe('e1');

    const grown = frames.filter((f) => f.type === 'add-to-tree');
    expect(grown).toHaveLength(3);
  });

  it('calls out a tie instead of breaking it silently', () => {
    const graph = makeGraph(
      ['a', 'b', 'c'],
      [
        ['a', 'b', 2],
        ['a', 'c', 2],
      ],
    );
    const frames = collect(prims(graph, 'a'));
    const selected = frames.find((f) => f.type === 'select-edge');
    expect(selected && 'tiedEdges' in selected ? selected.tiedEdges : undefined).toEqual(
      ['e0', 'e1'],
    );
  });

  it('keeps an unresolved frontier edge lit continuously across a round rather than toggling it off and back on', () => {
    // a's frontier is a-b (5) and a-c (1); a-c wins first, but a-b stays a
    // live, unresolved candidate until it is finally taken two rounds later -
    // it should never go dark and re-light in between
    const graph = makeGraph(
      ['a', 'b', 'c'],
      [
        ['a', 'b', 5],
        ['a', 'c', 1],
      ],
    );
    const frames = collect(prims(graph, 'a'));

    const relevant = frames.filter(
      (f): f is typeof f & { frontierEdgeIds?: readonly string[] } =>
        f.type === 'consider-edges' ||
        f.type === 'select-edge' ||
        f.type === 'add-to-tree',
    );

    const firstSeen = relevant.findIndex((f) => f.frontierEdgeIds?.includes('e0'));
    const resolvedAt = relevant.findIndex(
      (f) => f.type === 'add-to-tree' && 'edge' in f && f.edge === 'e0',
    );

    expect(firstSeen).toBeGreaterThanOrEqual(0);
    expect(resolvedAt).toBeGreaterThan(firstSeen);

    for (let i = firstSeen; i < resolvedAt; i++) {
      expect(relevant[i].frontierEdgeIds).toContain('e0');
    }
  });

  it('gives the active edge to only the edge actually being added, not the whole frontier', () => {
    const graph = makeGraph(
      ['a', 'b', 'c'],
      [
        ['a', 'b', 5],
        ['a', 'c', 1],
      ],
    );
    const frames = collect(prims(graph, 'a'));
    const selected = frames.find((f) => f.type === 'select-edge');
    expect(selected?.activeEdgeId).toBe('e1');
    expect(selected?.frontierEdgeIds).toContain('e0');
  });

  it('anchors activeNodeId to wherever the winning edge actually comes from, not just the last node grown', () => {
    // hub-a (1) wins round 1, growing the tree to {hub, a}. round 2's
    // cheapest edge is hub-b (2), which comes from hub - not from a, the
    // node that grew the tree last - so activeNodeId must follow the edge,
    // not the history of which node was added most recently
    const graph = makeGraph(
      ['hub', 'a', 'b'],
      [
        ['hub', 'a', 1],
        ['hub', 'b', 2],
        ['a', 'b', 100],
      ],
    );
    const frames = collect(prims(graph, 'hub'));

    const selectEdgeFrames = frames.filter(
      (f): f is typeof f & { edge: string } => f.type === 'select-edge',
    );

    expect(selectEdgeFrames).toHaveLength(2);
    expect(selectEdgeFrames[0].edge).toBe('e0'); // hub-a
    expect(selectEdgeFrames[0].activeNodeId).toBe('hub');
    expect(selectEdgeFrames[1].edge).toBe('e1'); // hub-b
    expect(selectEdgeFrames[1].activeNodeId).toBe('hub'); // from hub, not 'a'
  });

  it('has no single activeNodeId while the whole frontier is being weighed at once', () => {
    // with two crossing edges from the same start, nothing is singularly
    // "active" yet - the comparison spans the whole cut, so pinning the
    // highlight to one node would misrepresent it as a local decision
    const graph = makeGraph(
      ['a', 'b', 'c'],
      [
        ['a', 'b', 5],
        ['a', 'c', 1],
      ],
    );
    const frames = collect(prims(graph, 'a'));
    const considered = frames.find((f) => f.type === 'consider-edges');
    expect(considered?.activeNodeId).toBeUndefined();
  });

  it('breaks ties arbitrarily rather than always favoring the earliest edge', () => {
    // a star of five equally-cheap spokes: every run has a 1-in-5 chance of
    // picking e0 first if ties are broken fairly. running it a few dozen
    // times should see more than one winner - a flaky-looking test here is
    // actually the point, since it's proof the tie-break isn't deterministic
    const graph = makeGraph(
      ['hub', 'a', 'b', 'c', 'd', 'e'],
      [
        ['hub', 'a', 1],
        ['hub', 'b', 1],
        ['hub', 'c', 1],
        ['hub', 'd', 1],
        ['hub', 'e', 1],
      ],
    );

    const firstPicks = new Set<string>();
    for (let i = 0; i < 50; i++) {
      const frames = collect(prims(graph, 'hub'));
      const selected = frames.find((f) => f.type === 'select-edge');
      if (selected?.activeEdgeId) firstPicks.add(selected.activeEdgeId);
    }

    expect(firstPicks.size).toBeGreaterThan(1);
  });

  it('walks undirected edges both ways by default', () => {
    const graph = makeGraph(
      ['a', 'b', 'c'],
      [
        ['b', 'a', 1],
        ['c', 'b', 2],
      ],
    );
    const frames = collect(prims(graph, 'a'));
    expect([...last(frames).treeEdgeIds].sort()).toEqual(['e0', 'e1']);
  });
});
