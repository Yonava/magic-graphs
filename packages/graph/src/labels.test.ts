import { describe, expect, test } from 'vitest';

import { useCoreGraph } from './core/index.ts';
import {
  useGraphLabelGetter,
  useNodeLetterLabelGetter,
  useNodeNumberLabelGetter,
} from './labels.ts';

describe('graph labels', () => {
  test('graphLabelGetter', () => {
    const graph = useCoreGraph({});
    const getNewLabel = useGraphLabelGetter(graph.nodes, ['A', 'B', 'C']);

    const node1 = graph.actions.addNode({ label: getNewLabel() });
    if (!node1) throw new Error('Failed to create node');
    expect(node1.label).toBe('A');

    const node2 = graph.actions.addNode({ label: getNewLabel() });
    if (!node2) throw new Error('Failed to create node');
    expect(node2.label).toBe('B');

    const node3 = graph.actions.addNode({ label: getNewLabel() });
    if (!node3) throw new Error('Failed to create node');
    expect(node3.label).toBe('C');

    const node4 = graph.actions.addNode({ label: getNewLabel() });
    if (!node4) throw new Error('Failed to create node');
    expect(node4.label).toBe('AA');

    const node5 = graph.actions.addNode({ label: getNewLabel() });
    if (!node5) throw new Error('Failed to create node');
    expect(node5.label).toBe('AB');

    graph.actions.removeNode(node2.id);

    // replaces gap in the sequence
    const node6 = graph.actions.addNode({ label: getNewLabel() });
    if (!node6) throw new Error('Failed to create node');
    expect(node6.label).toBe('B');
  });

  test('nodeLetterLabelGetter', () => {
    const graph = useCoreGraph({});
    const getNewLabel = useNodeLetterLabelGetter(graph);

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < alphabet.length; i++) {
      graph.actions.addNode({ label: getNewLabel() });
    }

    const labels = graph.nodes.value.map((node) => node.label).join('');
    expect(labels).toBe(alphabet);
  });

  test('nodeNumberLabelGetter', () => {
    const graph = useCoreGraph({});
    const getNewLabel = useNodeNumberLabelGetter(graph);
    for (let i = 0; i < 99; i++) {
      graph.actions.addNode({ label: getNewLabel() });
      expect(graph.nodes.value[i].label).toBe((i + 1).toString());
    }
  });
});
