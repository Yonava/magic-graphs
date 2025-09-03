import { selectFromGraph } from './select';
import { useGraph } from '@magic/graph/useGraph.ts';
import { describe, expect, test } from 'vitest';

import { ref } from 'vue';

describe('select from graph', () => {
  // TODO get canvas to actually work in the test suite
  // const canvas = document.createElement('canvas')
  // canvas.width = 1000
  // canvas.height = 1000
  // canvas.style.position = 'fixed'
  // canvas.style.top = '0'
  // canvas.style.left = '0'
  // document.body.appendChild(canvas)

  const graph = useGraph(ref());

  const node1 = graph.addNode({ x: 100, y: 100 });
  const node2 = graph.addNode({ x: 200, y: 200 });

  if (!node1 || !node2) throw new Error('failed to add nodes');

  const edge = graph.addEdge({ from: node1.id, to: node2.id });

  if (!edge) throw new Error('failed to add edge');

  test('select from graph cancels properly', async () => {
    const { selectedItemPromise, cancelSelection } = selectFromGraph(graph);
    setTimeout(cancelSelection, 100);
    const nodeSchema = await selectedItemPromise;
    expect(nodeSchema).toBeUndefined();
  });
});
