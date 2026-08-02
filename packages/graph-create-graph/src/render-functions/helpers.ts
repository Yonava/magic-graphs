import { ComputedTokenResolver } from '@graph/plugins-shared/computed-tokens/internals/createComputedTokenResolver';
import { CoreEdge, CoreNode } from '@graph/primitives/types';

export const resolveNodeComputedTokens =
  (token: ComputedTokenResolver) => (node: CoreNode) => ({
    color: token('node.color', node),
    size: token('node.size', node),
    border: {
      color: token('node.border.color', node),
      width: token('node.border.width', node),
    },
    cursor: token('node.cursor', node),
    text: {
      content: token('node.text.content', node),
      fontSize: token('node.text.size', node),
      color: token('node.text.color', node),
      fontWeight: token('node.text.fontWeight', node),
    },
  });

export const resolveEdgeComputedTokens =
  (token: ComputedTokenResolver) => (edge: CoreEdge) => ({
    color: token('edge.color', edge),
    width: token('edge.width', edge),
    cursor: token('edge.cursor', edge),
    text: {
      content: token('edge.text.content', edge),
      fontSize: token('edge.text.size', edge),
      color: token('edge.text.color', edge),
      fontWeight: token('edge.text.fontWeight', edge),
    },
  });
