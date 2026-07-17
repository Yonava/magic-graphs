import { CoreControls } from '@graph/core/types';
import { createComputedTokenResolver } from '@graph/plugins-shared/computed-tokens';
import { CanvasElement } from '@graph/plugins/canvas/aggregator/types';
import { CANVAS_ELEMENT_CURSOR_FIELD_KEY } from '@graph/plugins/canvas/setupCanvasCursor';
import { CanvasControls } from '@graph/plugins/canvas/types';
import { CoreEdge, CoreNode } from '@graph/primitives/types';

import { edgeRenderer } from './render-functions/edge.ts';
import { nodeRenderer } from './render-functions/node.ts';

export const createCanvasElementFactories = (
  controls: CoreControls & { canvas: CanvasControls },
  tokenResolver: ReturnType<typeof createComputedTokenResolver>,
) => {
  const nodeCanvasElement = (node: CoreNode): CanvasElement | undefined => {
    const shape = nodeRenderer({ resolver: tokenResolver, controls, node });
    if (!shape) return;

    return {
      id: node.id,
      priority: controls.canvas.getNodePriority()(node.id),
      shape,
      data: {
        [CANVAS_ELEMENT_CURSOR_FIELD_KEY]: tokenResolver('node.cursor', node),
      },
    };
  };

  const edgeCanvasElement = (edge: CoreEdge): CanvasElement | undefined => {
    const shape = edgeRenderer({ resolver: tokenResolver, controls, edge });
    if (!shape) return;

    return {
      shape,
      id: edge.id,
      priority: 1,
      data: {
        [CANVAS_ELEMENT_CURSOR_FIELD_KEY]: tokenResolver('edge.cursor', edge),
      },
    };
  };

  return { nodeCanvasElement, edgeCanvasElement };
};
