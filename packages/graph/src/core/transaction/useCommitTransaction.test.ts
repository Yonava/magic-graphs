import { Fraction } from 'mathjs';
import { describe, expect, it, vi } from 'vitest';

import { ref } from 'vue';

import { CoreEdge, CoreNode } from '../../types.ts';
import { createEmptyPayload } from './createEmptyPayload.ts';
import { TransactionPayload } from './types.ts';
import { useCommitTransaction } from './useCommitTransaction.ts';

describe(useCommitTransaction, () => {
  it('handles adding a node', () => {
    const newNode: CoreNode = { id: 'new-node' };
    const commitTransaction = useCommitTransaction({
      getGraph: () => ({ nodes: ref([]), edges: ref([]) }),
      onTransactionSucceeded: () => {},
    });
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

    const commitTransaction = useCommitTransaction({
      getGraph: () => ({
        nodes: ref([node1, node2]),
        edges: ref([connectedEdge]),
      }),
      onTransactionSucceeded: () => {},
    });

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

    const commitTransaction = useCommitTransaction({
      getGraph: () => ({ nodes: ref([]), edges: ref([]) }),
      onTransactionSucceeded: successSpy,
    });

    const payload = commitTransaction({ addNodes: [newNode] });
    expect(successSpy).toHaveBeenCalledExactlyOnceWith(payload);
  });
});
