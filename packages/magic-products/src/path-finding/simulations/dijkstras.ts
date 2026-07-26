import { GNode } from '@magic/shared/graph';
import Fraction from 'fraction.js';

import { Arc, SingleSourceFunction, arcsBySource } from './arcs.ts';
import { Distance, PathFindingFrame } from './frame.ts';

export const dijkstras: SingleSourceFunction =
  (graph, sourceNodeId) => (frameCollector) => {
    const outgoing = arcsBySource(graph);
    if (!(sourceNodeId in outgoing)) return;

    const distances: Record<GNode['id'], Distance> = {};
    for (const node of graph.nodes.value) distances[node.id] = undefined;
    distances[sourceNodeId] = new Fraction(0);

    const settled = new Set<GNode['id']>();
    /** the arc each node's best distance arrived on, which is what draws the tree */
    const arrivedOn = new Map<GNode['id'], Arc>();

    /*
      the frontier is derived rather than kept, so it can never disagree with the
      distances it is ordered by. a real implementation would reach for a heap;
      at this size a sort per frame is cheaper than the bookkeeping a heap needs
      to stay correct as distances improve underneath it
    */
    const frontier = () =>
      Object.keys(distances)
        .filter((id) => !settled.has(id) && distances[id] !== undefined)
        .sort((a, b) => distances[a]!.compare(distances[b]!));

    const frame = <T extends PathFindingFrame>(fields: T) => ({
      distances: { ...distances },
      settledNodeIds: [...settled],
      pendingNodeIds: frontier(),
      treeEdgeIds: [...arrivedOn.values()].map((arc) => arc.edgeId),
      anchorNodeId: sourceNodeId,
      ...fields,
    });

    frameCollector.add(frame({ type: 'start', source: sourceNodeId }));

    for (let nearest = frontier().at(0); nearest; nearest = frontier().at(0)) {
      settled.add(nearest);

      frameCollector.add(
        frame({
          type: 'settle-node',
          node: nearest,
          distance: distances[nearest]!,
          activeNodeId: nearest,
        }),
      );

      for (const arc of outgoing[nearest] ?? []) {
        const offered = distances[nearest]!.add(arc.weight);
        const current = distances[arc.to];

        frameCollector.add(
          frame({
            type: 'relax-edge',
            edge: arc.edgeId,
            from: arc.from,
            to: arc.to,
            activeNodeId: nearest,
            candidateNodeIds: [arc.to],
            relaxingEdgeIds: [arc.edgeId],
          }),
        );

        if (current !== undefined && current.lte(offered)) {
          frameCollector.add(
            frame({
              type: 'keep-distance',
              node: arc.to,
              distance: current,
              offered,
              activeNodeId: nearest,
              candidateNodeIds: [arc.to],
              rejectedEdgeIds: [arc.edgeId],
            }),
          );
          continue;
        }

        /*
          a settled neighbor is relaxed like any other rather than skipped. with
          non negative weights it always keeps its distance, so the skip would
          save nothing; with a negative weight it improves, and watching a
          finalized node move is the whole reason dijkstra bans them
        */
        distances[arc.to] = offered;
        arrivedOn.set(arc.to, arc);

        frameCollector.add(
          frame({
            type: 'improve-distance',
            node: arc.to,
            oldDistance: current,
            newDistance: offered,
            activeNodeId: nearest,
            candidateNodeIds: [arc.to],
            relaxingEdgeIds: [arc.edgeId],
          }),
        );
      }
    }

    const unreachable = Object.keys(distances).filter(
      (id) => distances[id] === undefined,
    );

    if (unreachable.length > 0) {
      frameCollector.add(frame({ type: 'unreachable', nodes: unreachable }));
    }

    frameCollector.add(frame({ type: 'end' }));
  };
