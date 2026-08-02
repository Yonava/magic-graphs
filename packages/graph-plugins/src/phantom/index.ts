import { createNodeRenderFunction } from '@graph/render-functions/index';

import { CanvasElement } from '../canvas/aggregator/types.ts';
import { createLabelThemer } from '../node-label/createLabelThemer.ts';
import { PhantomNode, PhantomPlugin } from './types.ts';

export const phantom: PhantomPlugin = ({ controls, finalTokenResolver }) => {
  const nodes: PhantomNode[] = [];
  const nodeIdToLabel = new Map<PhantomNode['id'], string>();

  const nodeRenderFunction = createNodeRenderFunction({
    shapes: controls.canvas.shapes,
    resolveToken: finalTokenResolver,
  });

  const render = (elements: CanvasElement[]) => {
    // nodes in graph rendered on a priority level between [2, 3)
    const NODE_RENDER_PRIORITY = 2;
    for (const node of nodes) {
      elements.push({
        id: node.id,
        priority: NODE_RENDER_PRIORITY,
        shape: nodeRenderFunction(node),
      });
    }
    return elements;
  };

  const themer = createLabelThemer(controls, (id) => nodeIdToLabel.get(id));
  themer.enable();

  controls.canvas.aggregator.transformers.push(render);

  const addNode = (node: PhantomNode & { label: string }) => {
    nodeIdToLabel.set(node.id, node.label);
    nodes.push(node);
  };

  addNode({
    id: 'phantom-node-1',
    position: { x: 850, y: 430 },
    label: 'A!',
  });
  addNode({
    id: 'phantom-node-2',
    position: { x: 850, y: 530 },
    label: 'B!',
  });

  return {
    name: 'phantom',
    controls: {},
  };
};
