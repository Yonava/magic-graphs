import { useTheme } from '@graph/themes/useTheme';
import type { GEdge, GNode, Graph } from '@graph/types';
import colors from '@utils/colors';

import { ref } from 'vue';

const USETHEME_ID = 'sim-guard-node-edge-colorizer';

const TARGET_COLOR = colors.RED_600;

/**
 * a themer to color nodes and edges based on their ids
 * along with helper functions to target nodes and edges
 */
export const useNodeEdgeTheme = (graph: Graph) => {
  const { setTheme, removeAllThemes } = useTheme(graph, USETHEME_ID);

  /**
   * ids of nodes and edges to color with `TARGET_COLOR`
   */
  const ids = ref(new Set<GNode['id'] | GEdge['id']>());

  const colorItem = (item: GNode | GEdge) => {
    if (ids.value.has(item.id)) return TARGET_COLOR;
  };

  const theme = () => {
    setTheme('nodeBorderColor', colorItem);
    setTheme('edgeColor', colorItem);
  };

  const untheme = () => {
    removeAllThemes();
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
     * @returns `themer` with nodes to target, defaults to all nodes
     */
    nodes: (nodeIds = graph.nodes.value.map((n) => n.id)) => (
      (ids.value = new Set(nodeIds)), themer
    ),
    /**
     * @returns `themer` with edges to target, defaults to all edges
     */
    edges: (edgeIds = graph.edges.value.map((e) => e.id)) => (
      (ids.value = new Set(edgeIds)), themer
    ),

    themer,
  };
};
