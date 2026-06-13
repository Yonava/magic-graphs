import { Fraction } from 'mathjs';
import { describe, expect, it, vi } from 'vitest';

import { GEdge, GNode } from '../../types.ts';
import { createEmptyPayload } from './createEmptyPayload.ts';
import { TransactionPayload } from './types.ts';
import { useCommitTransaction } from './useCommitTransaction.ts';

describe('useCommitTransaction', () => {
  it('handles adding a node', () => {
    const newNode: GNode = { id: 'new-node', label: '' };
    const commitTransaction = useCommitTransaction({
      getGraphState: () => ({ nodes: [], edges: [] }),
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
    const node1: GNode = { id: 'node-1', label: 'A' };
    const node2: GNode = { id: 'node-2', label: 'B' };
    const connectedEdge: GEdge = {
      id: 'edge-1',
      source: 'node-1',
      target: 'node-2',
      weight: new Fraction(1),
    };

    const commitTransaction = useCommitTransaction({
      getGraphState: () => ({
        nodes: [node1, node2],
        edges: [connectedEdge],
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

  it('pulls updated metadata correctly and captures previous values', () => {
    const existingNode: GNode = {
      id: 'node-1',
      label: 'Old Label',
    };

    const commitTransaction = useCommitTransaction({
      getGraphState: () => ({ nodes: [existingNode], edges: [] }),
      onTransactionSucceeded: () => {},
    });

    const expectedPayload: TransactionPayload = {
      ...createEmptyPayload(),
      updatedNodes: [
        {
          node: { id: 'node-1', label: 'New Label' },
          previousValues: { label: 'Old Label' },
        },
      ],
    };

    const payload = commitTransaction({
      updatedNodes: [{ id: 'node-1', values: { label: 'New Label' } }],
    });

    expect(payload).toEqual(expectedPayload);
  });

  it('fires the onTransactionSuccess callback with the correct payload', () => {
    const newNode: GNode = { id: 'node-z', label: 'Z' };

    const successSpy = vi.fn();

    const commitTransaction = useCommitTransaction({
      getGraphState: () => ({ nodes: [], edges: [] }),
      onTransactionSucceeded: successSpy,
    });

    const payload = commitTransaction({ addNodes: [newNode] });
    expect(successSpy).toHaveBeenCalledExactlyOnceWith(payload);
  });
});
