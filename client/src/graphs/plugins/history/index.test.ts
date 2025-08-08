import { useBaseGraph } from '@graph/base';
import { describe, expect, test } from 'vitest';

import { ref } from 'vue';

import { useHistory } from './index';

describe('useHistoryGraph', () => {
  const graph = useBaseGraph(ref());
  const historyPlugin = useHistory(graph);
  const historyGraph = {
    ...graph,
    ...historyPlugin,
  };

  test('undoes and redoes', () => {
    const node1 = historyGraph.addNode({});
    const node2 = historyGraph.addNode({});
    if (!node1 || !node2) throw new Error('Node is undefined');
    historyGraph.addEdge({ from: node1.id, to: node2.id });
    const record = historyGraph.undo();
    if (!record) throw new Error('Record is undefined');
    const { action, affectedItems } = record;
    const { redoStack, undoStack } = historyGraph;
    expect(undoStack.value.length).toBe(2);
    expect(redoStack.value.length).toBe(1);
    expect(action).toBe('add');
    expect(affectedItems[0].graphType).toBe('edge');
    expect(redoStack.value).toContain(record);
  });

  test('clears history', () => {
    historyGraph.addNode({});
    historyGraph.addNode({});
    historyGraph.undo();
    historyGraph.redo();
    historyGraph.clearHistory();
    expect(historyGraph.undoStack.value.length).toBe(0);
    expect(historyGraph.redoStack.value.length).toBe(0);
  });

  test('can redo and can undo are correct', () => {
    expect(historyGraph.canUndo.value).toBe(false);
    expect(historyGraph.canRedo.value).toBe(false);
    historyGraph.addNode({});
    expect(historyGraph.canUndo.value).toBe(true);
    historyGraph.undo();
    expect(historyGraph.canRedo.value).toBe(true);
    expect(historyGraph.canUndo.value).toBe(false);
  });

  test('moves nodes correctly', () => {
    const node = historyGraph.addNode({});
    if (!node) throw new Error('Node is undefined');

    // simulates a node being picked up and dropped in a new location
    historyGraph.undoStack.value.push({
      action: 'move',
      affectedItems: [
        {
          graphType: 'node',
          data: {
            id: node.id,
            from: { x: 10, y: 10 },
            to: { x: 20, y: 20 },
          },
        },
      ],
    });

    historyGraph.undo();

    expect(node.x).toBe(10);
    expect(node.y).toBe(10);

    historyGraph.redo();

    expect(node.x).toBe(20);
    expect(node.y).toBe(20);
  });
});
