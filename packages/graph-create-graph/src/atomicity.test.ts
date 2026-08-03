import { core } from '@graph/core/index';
import { effect, reactiveMap } from '@reactive/primitives/index';
import { describe, expect, it } from 'vitest';

import { foldPlugins } from './fold-plugins.ts';
import { createGraphTransit } from './graph-transit.ts';

/**
 * core's `atomic` covers core's own writes. these cover the layer above it: a composed
 * action, and a decode, are each one flush no matter how many plugins contribute state.
 */

// the value getNode falls back to, so a torn read is identifiable
const UNLABELED = '?';

/**
 * a stand-in for nodeLabel (which needs the canvas plugin to build) carrying the only
 * shape that matters here: plugin owned reactive state written after the core action.
 */
const labeler = ({ actions, getters, events }: any) => {
  const labels = reactiveMap<string, string>();
  let nextLabel = 0;

  const setLabels = (entries: [string, string][]) => {
    for (const [nodeId, label] of entries) labels.set(nodeId, label);
  };

  return {
    name: 'labeler',
    events,
    transit: {
      encode: () => Array.from(labels),
      decode: setLabels,
      validate: () => true,
    },
    getters: {
      ...getters,
      getNode: (id: string) => ({
        ...getters.getNode(id),
        label: labels.get(id) ?? UNLABELED,
      }),
    },
    actions: {
      ...actions,
      addNode: (options: any) => {
        const node = actions.addNode(options);
        labels.set(node.id, `L${nextLabel++}`);
        return node;
      },
      removeElements: (options: any) => {
        const removed = actions.removeElements(options);
        for (const nodeId of removed.removedNodeIds) labels.delete(nodeId);
        return removed;
      },
    },
  };
};

const build = () => {
  const coreGraph = core({});
  const folded = foldPlugins(coreGraph, [labeler] as any, {}, () => 'd');
  return { coreGraph, folded };
};

/** every state a single derivation wakes up to, initial run excluded */
const observeNodes = (folded: ReturnType<typeof build>['folded']) => {
  const observed: { id: string; label: string }[][] = [];

  const stop = effect(() => {
    observed.push(folded.getNodes().map((n: any) => ({ ...n })));
  });
  observed.length = 0;

  return { observed, stop };
};

const torn = (states: { id: string; label: string }[][]) =>
  states.flatMap((state) => state.filter((n) => n.label === UNLABELED));

describe('composition atomicity', () => {
  it('never exposes a node a plugin has not finished decorating', () => {
    const { folded } = build();

    const { observed, stop } = observeNodes(folded);
    folded.actions.addNode({});
    stop();

    expect(torn(observed)).toEqual([]);
  });

  it('wakes derivations once per composed action, not once per contributor', () => {
    const { folded } = build();

    const { observed, stop } = observeNodes(folded);
    folded.actions.addNode({});
    stop();

    expect(observed).toHaveLength(1);
  });

  it('holds across a decode, where every plugin restores its own state', () => {
    const { coreGraph, folded } = build();
    const transit = createGraphTransit({
      pluginTransitControls: folded.pluginTransitControls,
      coreGraph,
      consumerEvents: folded.consumerEvents,
      transitEvents: folded.transitEvents,
    });

    folded.actions.addNode({});
    folded.actions.addNode({});
    const snapshot = transit.encode();
    folded.actions.removeElements({ nodes: folded.getNodes(), edges: [] });

    const { observed, stop } = observeNodes(folded);
    transit.decode(snapshot);
    stop();

    expect(torn(observed)).toEqual([]);
    expect(observed).toHaveLength(1);
  });
});
