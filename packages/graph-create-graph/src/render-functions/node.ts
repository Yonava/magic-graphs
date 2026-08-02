import { resolveNodeComputedTokens } from './helpers.ts';
import { CreateNodeRenderer } from './types.ts';

export const createNodeRenderer: CreateNodeRenderer = ({ shapes, token }) => {
  const getStyles = resolveNodeComputedTokens(token);
  return (node) => {
    const styles = getStyles(node);
    return shapes.circle({
      id: node.id,
      at: node.position,
      radius: styles.size,
      fillColor: styles.color,
      stroke: {
        color: styles.border.color,
        lineWidth: styles.border.width,
      },
      textArea: {
        color: 'transparent',
        textBlock: styles.text,
      },
    });
  };
};
