import { Shape } from '@canvas/primitives/types/index';
import { nullThrows } from '@core/utils/assert';
import { CoreControls } from '@graph/core/types';
import { CompoundTokenResolver } from '@graph/plugins-shared/computed-tokens';
import { CanvasControls } from '@graph/plugins/canvas/types';
import { CoreNode } from '@graph/primitives/types';

type Props = {
  resolver: CompoundTokenResolver;
  node: CoreNode;
  controls: CoreControls & { canvas: CanvasControls };
};

type NodeRenderer = (props: Props) => Shape | undefined;

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

export const nodeRenderer: NodeRenderer = ({ resolver, node, controls }) => {
  const position = nullThrows(
    controls.positions.get(node.id),
    `could not resolve position for node with id ${node.id}`,
  );
  const styles = resolveNodeComputedTokens(resolver)(node);

  return controls.canvas.shapes.shapes.circle({
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
