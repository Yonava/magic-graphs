import { nullThrows } from '@core/utils/assert';

import { CanvasElement } from '../canvas/aggregator/types.ts';
import { createLabelThemer } from './createLabelThemer.ts';
import { PhantomEdge, PhantomNode, PhantomPlugin } from './types.ts';

export const phantom: PhantomPlugin = ({
  controls,
  finalRenderFunctions: renderFunctions,
}) => {
  const nodes: PhantomNode[] = [];
  const edges: PhantomEdge[] = [];

  const getNodePosition = (id: string) => {
    if (controls.isNode(id)) return controls.positions.get(id);
    return nullThrows(
      nodes.find((node) => node.id === id),
      `could not resolve position for node with id ${id}`,
    ).position;
  };

  const getNode = (id: string) => ({ id, position: getNodePosition(id) });

  const render = (elements: CanvasElement[]) => {
    // nodes in graph rendered on a priority level between [2, 3)
    const NODE_RENDER_PRIORITY = 2;
    // edges in graph rendered on priority level 1
    const EDGE_RENDER_PRIORITY = 1;
    for (const node of nodes) {
      elements.push({
        id: node.id,
        priority: NODE_RENDER_PRIORITY,
        shape: renderFunctions.node()(node),
      });
    }
    for (const edge of edges) {
      elements.push({
        id: edge.id,
        priority: EDGE_RENDER_PRIORITY,
        shape: renderFunctions.edge()({
          id: edge.id,
          source: getNode(edge.source),
          target: getNode(edge.target),
        }),
      });
    }
    return elements;
  };

  const labelThemer = createLabelThemer(
    controls,
    ({ id }) =>
      nodes.find((n) => n.id === id)?.label ??
      edges.find((e) => e.id === id)?.label,
  );
  labelThemer.enable();

  controls.canvas.aggregator.transformers.push(render);

  const addNode = (node: PhantomNode) => {
    nodes.push(node);
  };

  const addEdge = (edge: PhantomEdge) => {
    edges.push(edge);
  };

  // addNode({
  //   id: 'phantom-node-1',
  //   position: { x: 850, y: 430 },
  //   label: 'A!',
  // });
  // addNode({
  //   id: 'phantom-node-2',
  //   position: { x: 850, y: 30 },
  //   label: 'B!',
  // });
  // addEdge({
  //   id: 'phantom-edge-1',
  //   source: 'phantom-node-1',
  //   target: 'phantom-node-2',
  //   label: 'ABC',
  // });

  return {
    name: 'phantom',
    controls: {
      addNode,
      addEdge,
      nodes: () => nodes,
      edges: () => edges,
      getNodePosition,
    },
  };
};
