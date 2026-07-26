import { GEdge, GNode, Graph } from '@magic/shared/graph';
import { FrameCollectorFn } from '@magic/shared/simulation/types';
import Fraction from 'fraction.js';

import { PathFindingFrame } from './frame.ts';

export type SingleSourceFunction = (
  graph: Graph,
  sourceNodeId: GNode['id'],
) => FrameCollectorFn<PathFindingFrame>;

export type AllPairsFunction = (
  graph: Graph,
) => FrameCollectorFn<PathFindingFrame>;

/**
 * one direction of one edge, which is the unit all three algorithms relax. an
 * undirected edge yields two arcs, since either endpoint can be reached from
 * the other.
 *
 * the arc carries the edge id rather than leaving the caller to look one up per
 * relaxation, so a graph with parallel edges highlights the edge actually being
 * tested instead of whichever one happens to be found first
 */
export type Arc = {
  edgeId: GEdge['id'];
  from: GNode['id'];
  to: GNode['id'];
  /** the edge's own weight, carried across as the fraction it already is */
  weight: Fraction;
};

export const arcs = (graph: Graph): Arc[] => {
  const collected: Arc[] = [];

  for (const edge of graph.edges.value) {
    const forward = {
      edgeId: edge.id,
      from: edge.source,
      to: edge.target,
      weight: edge.weight,
    };
    collected.push(forward);
    if (graph.metadata.directed) continue;
    collected.push({ ...forward, from: edge.target, to: edge.source });
  }

  return collected;
};

/** the arcs leaving each node, so dijkstra can expand a node without a full scan */
export const arcsBySource = (graph: Graph): Record<GNode['id'], Arc[]> => {
  const bySource: Record<GNode['id'], Arc[]> = {};
  for (const node of graph.nodes.value) bySource[node.id] = [];
  for (const arc of arcs(graph)) bySource[arc.from]?.push(arc);
  return bySource;
};
