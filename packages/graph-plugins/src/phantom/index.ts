import { Shape } from '@canvas/primitives/types/index';
import { Coordinate } from '@canvas/primitives/types/utility';
import { CoreNode } from '@graph/primitives/types';

import { CanvasElement } from '../canvas/aggregator/types.ts';
import { PhantomPlugin } from './types.ts';

type PhantomNode = CoreNode & {
  position: Coordinate;
  label: string;
};

type NodeRenderFunctionProps = {
  node: PhantomNode;
};

type NodeRenderFunction = (props: NodeRenderFunctionProps) => Shape;

export const phantom: PhantomPlugin = ({ controls }) => {
  const nodes: PhantomNode[] = [
    { id: 'phantom-node-1', position: { x: 850, y: 430 }, label: 'P!' },
    { id: 'phantom-node-2', position: { x: 850, y: 530 }, label: 'Z!' },
  ];

  const resolveToken = controls.canvas.theme._resolveToken;

  const nodeRenderer: NodeRenderFunction = ({ node }) => {
    return controls.canvas.shapes.circle({
      id: node.id,
      at: node.position,
      radius: resolveToken('node.default.size', node),
      fillColor: resolveToken('node.default.color', node),
      stroke: {
        color: resolveToken('node.default.border.color', node),
        lineWidth: resolveToken('node.default.border.width', node),
      },
      textArea: {
        color: 'transparent',
        textBlock: {
          content: node.label,
          fontSize: resolveToken('node.default.text.size', node),
          fontWeight: resolveToken('node.default.text.fontWeight', node),
          color:
            controls.canvas.graphUnderCursor.topElement?.id === node.id
              ? 'red'
              : resolveToken('node.default.text.color', node),
        },
      },
    });
  };

  const render = (elements: CanvasElement[]) => {
    for (const node of nodes) {
      elements.push({
        id: node.id,
        priority: 0,
        shape: nodeRenderer({ node }),
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
