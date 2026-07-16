import { LooseGraphPlugin } from '@graph/plugins-shared/plugins';
import { describe, expect, it, vi } from 'vitest';

import { foldPlugins } from './fold-plugins.ts';

// mimics real plugins like node-label: wraps addNode by calling the inbound
// action first, then mutating its own local state afterward, outside any
// core transaction. this is exactly the shape that made the original bug
// possible (onNodesAdded firing before the label existed).
const createLabelingPlugin =
  (nodeIdToLabel: Map<string, string>): LooseGraphPlugin =>
  ({ events, actions, getters }) => ({
    name: 'labeling',
    controls: {},
    events,
    getters,
    actions: {
      ...actions,
      addNode: (options: any) => {
        const node = actions.addNode(options);
        nodeIdToLabel.set(node.id, `label-${node.id}`);
        return node;
      },
    },
  });

// mimics the interactive plugin: doesn't extend the action pipeline, just
// captures a reference at fold time to call later, in response to something
// external (here, a manually-invoked callback instead of a real click).
const createTriggeringPlugin = (
  onReady: (trigger: () => any) => void,
): LooseGraphPlugin =>
  ({ actions, finalActions, events, getters }) => {
    onReady(() => finalActions.addNode({}));

    return {
      name: 'triggering',
      controls: {},
      events,
      getters,
      actions,
    };
  };

describe('finalActions', () => {
  it('resolves to the fully-composed action, unlike a captured `actions` snapshot', () => {
    const nodeIdToLabel = new Map<string, string>();
    let trigger: (() => any) | undefined;

    const folded = foldPlugins(
      {},
      [
        createLabelingPlugin(nodeIdToLabel),
        createTriggeringPlugin((t) => (trigger = t)),
      ],
      {},
      'default',
    );

    let labelAtEmitTime: string | undefined;
    folded.events.subscribe('onNodesAdded', (nodes: any[]) => {
      labelAtEmitTime = nodeIdToLabel.get(nodes[0].id);
    });

    // invoked well after folding completes, exactly like a real click handler
    const node = trigger!();

    expect(labelAtEmitTime).toBe(`label-${node.id}`);
  });
});

describe('foldPlugins structural events', () => {
  it('fires onNodesAdded only after the fully-composed action finishes', () => {
    const nodeIdToLabel = new Map<string, string>();
    const folded = foldPlugins(
      {},
      [createLabelingPlugin(nodeIdToLabel)],
      {},
      'default',
    );

    let labelAtEmitTime: string | undefined;
    folded.events.subscribe('onNodesAdded', (nodes: any[]) => {
      labelAtEmitTime = nodeIdToLabel.get(nodes[0].id);
    });

    const node = folded.actions.addNode({});

    expect(labelAtEmitTime).toBe(`label-${node.id}`);
  });

  it('fires onStructureChange exactly once per structural action', () => {
    const folded = foldPlugins({}, [], {}, 'default');

    const onStructureChange = vi.fn();
    folded.events.subscribe('onStructureChange', onStructureChange);

    folded.actions.addNode({});

    expect(onStructureChange).toHaveBeenCalledTimes(1);
  });

  it('does not fire structural events when nothing changed', () => {
    const folded = foldPlugins({}, [], {}, 'default');

    const onNodesAdded = vi.fn();
    const onStructureChange = vi.fn();
    folded.events.subscribe('onNodesAdded', onNodesAdded);
    folded.events.subscribe('onStructureChange', onStructureChange);

    // an empty bulk add is a no-op: nothing was actually added
    folded.actions.addElements({ nodes: [], edges: [] } as any);

    expect(onNodesAdded).not.toHaveBeenCalled();
    expect(onStructureChange).not.toHaveBeenCalled();
  });

  it('derives onStructureChange from edge weight commits, independent of action wrapping', () => {
    const folded = foldPlugins({}, [], {}, 'default');

    const nodeA = folded.actions.addNode({});
    const nodeB = folded.actions.addNode({});
    const edge = folded.actions.addEdge({
      source: nodeA.id,
      target: nodeB.id,
    } as any);

    const onStructureChange = vi.fn();
    folded.events.subscribe('onStructureChange', onStructureChange);

    // weight is set directly on controls, bypassing the wrapped actions entirely
    folded.controls.weights.set({ edgeId: edge.id, update: 5 as any });

    expect(onStructureChange).toHaveBeenCalledTimes(1);
  });
});
