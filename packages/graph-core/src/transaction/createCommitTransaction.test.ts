import { TransactionPayload } from '@magic/graph-primitives/transactions/types';
import { CoreEdge, CoreNode } from '@magic/graph-primitives/types';
import { describe, expect, it, vi } from 'vitest';

import { createCommitTransaction } from './createCommitTransaction.ts';
import { createEmptyPayload } from './createEmptyPayload.ts';
import { TransactionOptions } from './types.ts';

const options = (
  state: {
    nodes?: CoreNode[];
    edges?: CoreEdge[];
    success?: () => void;
  } = {},
): TransactionOptions => {
  return {
    getGraph: () => ({ nodes: state.nodes ?? [], edges: state.edges ?? [] }),
    getters: {
      getEdge: (id) => state.edges?.find((e) => e.id === id)!,
      getNode: (id) => state.nodes?.find((n) => n.id === id)!,
    },
    onTransactionSucceeded: state.success ?? (() => {}),
  };
};

describe(createCommitTransaction, () => {
  it('handles adding a node', () => {
    const newNode: CoreNode = { id: 'new-node' };
    const commitTransaction = createCommitTransaction(options());
    const expectedPayload: TransactionPayload = {
      ...createEmptyPayload(),
      addedNodes: [newNode],
    };
    const payload = commitTransaction({ addNodes: [newNode] });
    expect(payload).toEqual(expectedPayload);
  });

  it('scrapes and removes orphaned edges automatically when a node is removed', () => {
    const node1: CoreNode = { id: 'node-1' };
    const node2: CoreNode = { id: 'node-2' };
    const connectedEdge: CoreEdge = {
      id: 'edge-1',
      source: 'node-1',
      target: 'node-2',
    };

    const commitTransaction = createCommitTransaction(
      options({
        nodes: [node1, node2],
        edges: [connectedEdge],
      }),
    );

    const expectedPayload: TransactionPayload = {
      ...createEmptyPayload(),
      removedNodeIds: [node1.id],
      // the engine should implicitly catch that edge-1 is now an orphan
      removedEdgeIds: [connectedEdge.id],
    };

    const payload = commitTransaction({ removeNodeIds: ['node-1'] });
    expect(payload).toEqual(expectedPayload);
  });

  it('fires the onTransactionSuccess callback with the correct payload', () => {
    const newNode: CoreNode = { id: 'node-z' };

    const successSpy = vi.fn();

    const commitTransaction = createCommitTransaction(
      options({ success: successSpy }),
    );

    const payload = commitTransaction({ addNodes: [newNode] });
    expect(successSpy).toHaveBeenCalledExactlyOnceWith(payload);
  });
});
