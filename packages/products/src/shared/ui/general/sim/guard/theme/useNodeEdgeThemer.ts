import type { GEdge } from '@magic/graph/types';
import colors from '@magic/utils/colors';

import { ref } from 'vue';

import type { GNode } from '../../../../../useGraph.ts';
import type { Graph } from '../../../../../useGraphWithCanvas.ts';

const USETHEME_ID = 'sim-guard-node-edge-colorizer';

const TARGET_COLOR = colors.RED_600;

/**
 * a themer to color nodes and edges based on their ids
 * along with helper functions to target nodes and edges
 */
export const useNodeEdgeTheme = (graph: Graph) => {
  const { set, removeAll } = graph.canvas.theme.createLayer(USETHEME_ID);

  /**
   * ids of nodes and edges to color with `TARGET_COLOR`
   */
  const ids = ref(new Set<GNode['id'] | GEdge['id']>());

  const colorElement = (elementId: GNode['id'] | GEdge['id']) => {
    if (ids.value.has(elementId)) return TARGET_COLOR;
  };

  const theme = () => {
    set('node.default.borderColor', ({ id }) => colorElement(id));
    set('edge.default.color', ({ id }) => colorElement(id));
  };

  const untheme = () => {
    removeAll();
  };

  const themer = {
    theme,
    untheme,
  };

  return {
    /**
     * a set of targets to color with `TARGET_COLOR`
     */
    ids,

    /**
     * @returns `themer` with nodes to target
     * @default graph.nodes.value.map((n) => n.id) // all nodes
     */
    nodes: (nodeIds = graph.nodes.value.map((n) => n.id)) => (
      (ids.value = new Set(nodeIds)),
      themer
    ),
    /**
     * @returns `themer` with edges to target
     * @default graph.edges.value.map((e) => e.id) // all edges
     */
    edges: (edgeIds = graph.edges.value.map((e) => e.id)) => (
      (ids.value = new Set(edgeIds)),
      themer
    ),

    themer,
  };
};
