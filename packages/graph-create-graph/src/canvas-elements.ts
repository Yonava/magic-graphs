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
  });

  // nodes one hop from either endpoint, excluding the endpoints themselves
  const getNeighborPositions = (edge: CoreEdge) => {
    const endpoints = new Set([edge.source, edge.target]);
    const neighborIds = new Set<CoreNode['id']>();

    for (const candidate of controls.edges()) {
      if (endpoints.has(candidate.source)) neighborIds.add(candidate.target);
      if (endpoints.has(candidate.target)) neighborIds.add(candidate.source);
    }

    for (const endpoint of endpoints) neighborIds.delete(endpoint);

    return [...neighborIds].map((nodeId) => controls.positions.get(nodeId));
  };

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
      parallelEdgeCount: controls.helpers.nodes.getEdgesBetweenConnectedNodes(
        edge.source,
        edge.target,
      ).length,
      neighborPositions: getNeighborPositions(edge),
    }),
    priority: 1,
    data: {
      [CANVAS_ELEMENT_CURSOR_FIELD_KEY]: tokenResolver('edge.cursor', edge),
    },
  });

  return {
    nodeToCanvasElement,
    edgeToCanvasElement,
  };
};
