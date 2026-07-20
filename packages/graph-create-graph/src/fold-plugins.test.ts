import { core } from '@graph/core/index';
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
const createTriggeringPlugin =
  (onReady: (trigger: () => any) => void): LooseGraphPlugin =>
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

// mimics nodeLabel: decorates getNode with plugin-local state, and calls
// invalidateGetters after mutating that state so getNodes() stays in sync.
const createLabelingGetterPlugin =
  (nodeIdToLabel: Map<string, string>): LooseGraphPlugin =>
  ({ events, actions, getters, invalidateGetters }) => ({
    name: 'labelingGetter',
    controls: {
      setLabel: (id: string, label: string) => {
        nodeIdToLabel.set(id, label);
        invalidateGetters();
      },
    },
    events,
    getters: {
      ...getters,
      getNode: (id: string) => ({
        ...getters.getNode(id),
        label: nodeIdToLabel.get(id) ?? '?',
      }),
    },
    actions: {
      ...actions,
      addNode: (options: any) => {
        const node = actions.addNode(options);
        nodeIdToLabel.set(node.id, `label-${node.id}`);
        return node;
      },
    },
  });

describe('finalActions', () => {
  it('resolves to the fully-composed action, unlike a captured `actions` snapshot', () => {
    const nodeIdToLabel = new Map<string, string>();
    let trigger: (() => any) | undefined;

    const folded = foldPlugins(
      core({}),
      [
        createLabelingPlugin(nodeIdToLabel),
        createTriggeringPlugin((t) => (trigger = t)),
      ],
      {},
      () => 'default',
    );

    let labelAtEmitTime: string | undefined;
    folded.events.subscribe('onNodesAdded', (nodes) => {
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
      core({}),
      [createLabelingPlugin(nodeIdToLabel)],
      {},
      () => 'default',
    );

    let labelAtEmitTime: string | undefined;
    folded.events.subscribe('onNodesAdded', (nodes) => {
      labelAtEmitTime = nodeIdToLabel.get(nodes[0].id);
    });

    const node = folded.actions.addNode({});

    expect(labelAtEmitTime).toBe(`label-${node.id}`);
  });

  it('fires onStructureChange exactly once per structural action', () => {
    const folded = foldPlugins(core({}), [], {}, () => 'default');

    const onStructureChange = vi.fn();
    folded.events.subscribe('onStructureChange', onStructureChange);

    folded.actions.addNode({});

    expect(onStructureChange).toHaveBeenCalledTimes(1);
  });

  it('does not fire structural events when nothing changed', () => {
    const folded = foldPlugins(core({}), [], {}, () => 'default');

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
    const folded = foldPlugins(core({}), [], {}, () => 'default');

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

describe('getters cache', () => {
  it('starts populated (empty) right after folding, without waiting on an invalidateGetters() call', () => {
    const folded = foldPlugins(core({}), [], {}, () => 'default');

    expect(folded.getNodes()).toEqual([]);
    expect(folded.getEdges()).toEqual([]);
  });

  it('auto-invalidates on structural changes without any plugin calling invalidateGetters', async () => {
    const folded = foldPlugins(core({}), [], {}, () => 'default');

    const node = folded.actions.addNode({});
    await Promise.resolve();

    expect(folded.getNodes().map((n: any) => n.id)).toContain(node.id);
  });

  it('reflects a plugin-local state change after that plugin calls invalidateGetters', async () => {
    const nodeIdToLabel = new Map<string, string>();
    const folded = foldPlugins(
      core({}),
      [createLabelingGetterPlugin(nodeIdToLabel)],
      {},
      () => 'default',
    );

    const node = folded.actions.addNode({});
    await Promise.resolve();

    (folded.controls as any).labelingGetter.setLabel(node.id, 'renamed');
    await Promise.resolve();

    const found = folded.getNodes().find((n: any) => n.id === node.id) as any;
    expect(found.label).toBe('renamed');
  });

  it('coalesces multiple invalidateGetters() calls in the same tick into one onGettersInvalidated emission', async () => {
    const nodeIdToLabel = new Map<string, string>();
    const folded = foldPlugins(
      core({}),
      [createLabelingGetterPlugin(nodeIdToLabel)],
      {},
      () => 'default',
    );

    const node = folded.actions.addNode({});
    await Promise.resolve();

    const onGettersInvalidated = vi.fn();
    folded.events._internal.gettersInvalidation.subscribe(
      'onGettersInvalidated',
      onGettersInvalidated,
    );

    const labeling = (folded.controls as any).labelingGetter;
    labeling.setLabel(node.id, 'a');
    labeling.setLabel(node.id, 'b');
    labeling.setLabel(node.id, 'c');

    expect(onGettersInvalidated).not.toHaveBeenCalled();
    await Promise.resolve();

    expect(onGettersInvalidated).toHaveBeenCalledTimes(1);
    const found = folded.getNodes().find((n: any) => n.id === node.id) as any;
    expect(found.label).toBe('c');
  });
});
