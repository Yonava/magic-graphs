import { describe, expect, it } from 'vitest';

import { ref } from 'vue';

import { useGraphWithCanvas } from '../useGraphWithCanvas.ts';
import { selectFromGraph } from './select.ts';

describe('select from graph', () => {
  const { graph } = useGraphWithCanvas(ref() as any);

  const node1 = graph.actions.addNode({ x: 100, y: 100 });
  const node2 = graph.actions.addNode({ x: 200, y: 200 });

  if (!node1 || !node2) throw new Error('failed to add nodes');

  const edge = graph.actions.addEdge({ source: node1.id, target: node2.id });

  if (!edge) throw new Error('failed to add edge');

  it('select from graph cancels properly', async () => {
    const { selectedItemPromise, cancelSelection } = selectFromGraph(graph);
    setTimeout(cancelSelection, 100);
    const nodeSchema = await selectedItemPromise;
    expect(nodeSchema).toBeUndefined();
  });
});
