import { Coordinate } from '@canvas/primitives/types/utility';
import { CoreNode } from '@graph/primitives/types';
import { createNodeRenderFunction } from '@graph/render-functions/index';

import { CanvasElement } from '../canvas/aggregator/types.ts';
import { PhantomPlugin } from './types.ts';

type PhantomNode = CoreNode & {
  position: Coordinate;
  label: string;
};

// nodes in graph rendered on a priority level between [2, 3)
const NODE_RENDER_PRIORITY = 2;

export const phantom: PhantomPlugin = ({ controls, finalTokenResolver }) => {
  const nodes: PhantomNode[] = [
    { id: 'phantom-node-1', position: { x: 850, y: 430 }, label: 'P!' },
    { id: 'phantom-node-2', position: { x: 850, y: 530 }, label: 'Z!' },
  ];

  const nodeRenderFunction = createNodeRenderFunction({
    shapes: controls.canvas.shapes,
    resolveToken: finalTokenResolver,
  });

  const render = (elements: CanvasElement[]) => {
    for (const node of nodes) {
      elements.push({
        id: node.id,
        priority: NODE_RENDER_PRIORITY,
        shape: nodeRenderFunction(node),
        data: {
          cursor: 'not-allowed',
        },
      });
    }
    return elements;
  };

  controls.canvas.aggregator.transformers.push(render);

  return {
    name: 'phantom',
    controls: {},
  };
};
