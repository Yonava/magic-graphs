import { LETTERS, graphLabelGetter } from '../labels';
import type { AutoGenerateGraphOptions } from '../templates/autoGenerate/types';
import type { GEdge, GNode } from '../types';
import { generateId } from '@magic/utils/id';

import { ref } from 'vue';

/**
 * Generates a set of nodes
 * @param nodeCount The number of nodes to generate.
 * @returns An array of nodes
 */
export const generateNodes = (nodeCount: number) => {
  const nodes = ref<GNode[]>([]);

  const getLabel = graphLabelGetter(nodes, LETTERS);

  for (let i = 0; i < nodeCount; i++) {
    nodes.value.push({
      id: generateId(),
      label: getLabel(),
      x: 0,
      y: 0,
    });
  }
  return nodes.value;
};

/**
 * Generates a set of edges between nodes
 * @param nodes The nodes to generate edges between
 * @param edgeCount The number of edges to generate
 * @param edgeLabel The label of the edges
 * @returns An array of edges
 */
export const generateEdges = (
  nodes: GNode[],
  edgeCount: number,
  edgeLabel: AutoGenerateGraphOptions['edgeLabel'],
) => {
  const edges: GEdge[] = [];
  for (let i = 0; i < edgeCount; i++) {
    const fromNode = nodes[Math.floor(Math.random() * nodes.length)];
    const toNode = nodes[Math.floor(Math.random() * nodes.length)];
    const label =
      typeof edgeLabel === 'function'
        ? edgeLabel(fromNode.id, toNode.id)
        : edgeLabel!;
    if (fromNode.id !== toNode.id) {
      edges.push({
        id: generateId(),
        from: fromNode.id,
        to: toNode.id,
        label,
      });
    }
  }
  return edges;
};
