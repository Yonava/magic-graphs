import { nullThrows } from '@core/utils/assert';
import { CoreControls } from '@graph/core/types';
import { ComputedTokenResolver } from '@graph/plugins-shared/computed-tokens';
import { CanvasElement } from '@graph/plugins/canvas/aggregator/types';
import { CANVAS_ELEMENT_CURSOR_FIELD_KEY } from '@graph/plugins/canvas/setupCanvasCursor';
import { CanvasControls } from '@graph/plugins/canvas/types';
import { CoreEdge, CoreNode } from '@graph/primitives/types';
import {
  createEdgeRenderFunction,
  createNodeRenderFunction,
} from '@graph/render-functions/index';
import { getNeighborPositions } from '@graph/render-functions/utils/getNeighborPositions';

export const createCanvasElementFactories = (
  controls: CoreControls & { canvas: CanvasControls },
  tokenResolver: ComputedTokenResolver,
) => {
  const nodeRenderFunction = createNodeRenderFunction({
    shapes: controls.canvas.shapes,
    resolveToken: tokenResolver,
  });

  const edgeRenderFunction = createEdgeRenderFunction({
    directed: controls.metadata.directed,
    labelled: controls.metadata.weighted,
    labelTextInputColor: () =>
      controls.canvas.theme._resolveToken('canvas.color'),
    shapes: controls.canvas.shapes,
    resolveToken: tokenResolver,
    parallelEdgeCount: (edge) =>
      controls.helpers.nodes.getEdgesBetweenConnectedNodes(
        edge.source.id,
        edge.target.id,
      ).length,
    neighborPositions: (edge) =>
      getNeighborPositions(edge, controls.edges(), controls.positions.get),
  });

  const nodeToCanvasElement = (node: CoreNode): CanvasElement => ({
    id: node.id,
    shape: nodeRenderFunction({
      id: node.id,
      position: nullThrows(
        controls.positions.get(node.id),
        `could not resolve position for node with id ${node.id}`,
      ),
    }),
    priority: controls.canvas.getNodePriority()(node.id),
    data: {
      [CANVAS_ELEMENT_CURSOR_FIELD_KEY]: tokenResolver('node.cursor', node),
    },
  });

  const EDGE_RENDER_PRIORITY = 1;
  const edgeToCanvasElement = (edge: CoreEdge): CanvasElement => ({
    id: edge.id,
    shape: edgeRenderFunction({
      id: edge.id,
      source: {
        id: edge.source,
        position: controls.positions.get(edge.source),
      },
      target: {
        id: edge.target,
        position: controls.positions.get(edge.target),
      },
    }),
    priority: EDGE_RENDER_PRIORITY,
    data: {
      [CANVAS_ELEMENT_CURSOR_FIELD_KEY]: tokenResolver('edge.cursor', edge),
    },
  });

  return {
    nodeToCanvasElement,
    edgeToCanvasElement,
    renderFunctions: {
      node: nodeRenderFunction,
      edge: edgeRenderFunction,
    },
  };
};
