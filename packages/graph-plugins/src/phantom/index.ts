import { AnimatedShapeFactories } from '@canvas/primitives/animation/index';
import { Shape } from '@canvas/primitives/types/index';
import { Coordinate } from '@canvas/primitives/types/utility';
import { ComputedTokenResolver } from '@graph/plugins-shared/computed-tokens';
import { CoreNode } from '@graph/primitives/types';

import { CanvasElement } from '../canvas/aggregator/types.ts';
import { PhantomPlugin } from './types.ts';

type PhantomNode = CoreNode & {
  position: Coordinate;
  label: string;
};

type NodeRenderFunction<Node extends CoreNode> = (node: Node) => Shape;

type Config = {
  shapes: AnimatedShapeFactories;
  token: ComputedTokenResolver;
};

type CreateNodeRenderer<Node extends CoreNode> = (
  config: Config,
) => NodeRenderFunction<Node>;

const createNodeRenderer: CreateNodeRenderer<PhantomNode> =
  ({ shapes, token }) =>
  (node) =>
    shapes.circle({
      id: node.id,
      at: node.position,
      radius: token('node.size', node),
      fillColor: token('node.color', node),
      stroke: {
        color: token('node.border.color', node),
        lineWidth: token('node.border.width', node),
      },
      textArea: {
        color: 'transparent',
        textBlock: {
          content: node.label,
          fontSize: token('node.text.size', node),
          fontWeight: token('node.text.fontWeight', node),
          color: token('node.text.color', node),
        },
      },
    });

// nodes in graph rendered on a priority level between [2, 3)
const NODE_RENDER_PRIORITY = 2;

export const phantom: PhantomPlugin = ({ controls, finalTokenResolver }) => {
  const nodes: PhantomNode[] = [
    { id: 'phantom-node-1', position: { x: 850, y: 430 }, label: 'P!' },
    { id: 'phantom-node-2', position: { x: 850, y: 530 }, label: 'Z!' },
  ];

  const nodeRenderer = createNodeRenderer({
    shapes: controls.canvas.shapes,
    token: finalTokenResolver,
  });

  const render = (elements: CanvasElement[]) => {
    for (const node of nodes) {
      elements.push({
        id: node.id,
        priority: NODE_RENDER_PRIORITY,
        shape: nodeRenderer(node),
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
