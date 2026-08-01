import { AnimatedShapeFactories } from '@canvas/primitives/animation/index';
import { Shape } from '@canvas/primitives/types/index';
import { Coordinate } from '@canvas/primitives/types/utility';
import { CompoundTokenResolver } from '@graph/plugins-shared/computed-tokens';
import { CoreNode } from '@graph/primitives/types';

type RendererProps = {
  resolver: CompoundTokenResolver;
  node: CoreNode;
  position: Coordinate;
  shapes: AnimatedShapeFactories;
};

type NodeRenderer = (props: RendererProps) => Shape | undefined;

export const resolveNodeComputedTokens =
  (resolver: CompoundTokenResolver) => (node: CoreNode) => ({
    color: resolver('node.color', node),
    size: resolver('node.size', node),
    border: {
      color: resolver('node.border.color', node),
      width: resolver('node.border.width', node),
    },
    cursor: resolver('node.cursor', node),
    text: {
      content: resolver('node.text.content', node),
      size: resolver('node.text.size', node),
      color: resolver('node.text.color', node),
      fontWeight: resolver('node.text.fontWeight', node),
    },
  });

export const nodeRenderer: NodeRenderer = ({
  resolver,
  node,
  shapes,
  position,
}) => {
  const styles = resolveNodeComputedTokens(resolver)(node);

  return shapes.circle({
    id: node.id,
    at: position,
    radius: styles.size,
    fillColor: styles.color,
    stroke: {
      color: styles.border.color,
      lineWidth: styles.border.width,
    },
    textArea: {
      color: 'transparent',
      textBlock: {
        content: styles.text.content,
        fontSize: styles.text.size,
        fontWeight: styles.text.fontWeight,
        color: styles.text.color,
      },
    },
  });
};
