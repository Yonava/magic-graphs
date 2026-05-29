import { LETTERS, useGraphLabelGetter } from '@magic/graph/labels';
import type { GEdge, GNode } from '@magic/graph/types';
import { generateId } from '@magic/utils/id';
import { Fraction } from 'mathjs';

import { ref } from 'vue';

import type { AutoGenerateGraphOptions } from '../templateTypes.ts';

/**
 * Generates a set of nodes
 * @param nodeCount The number of nodes to generate.
 * @returns An array of nodes
 */
export const generateNodes = (nodeCount: number) => {
  const nodes = ref<GNode[]>([]);

  const getLabel = useGraphLabelGetter(nodes, LETTERS);

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
 * @param edgeWeight The label of the edges
 * @returns An array of edges
 */
export const generateEdges = (
  nodes: GNode[],
  edgeCount: number,
  edgeWeight: AutoGenerateGraphOptions['edgeWeight'],
) => {
  const edges: GEdge[] = [];
  for (let i = 0; i < edgeCount; i++) {
    const fromNode = nodes[Math.floor(Math.random() * nodes.length)];
    const toNode = nodes[Math.floor(Math.random() * nodes.length)];
    const weight =
      typeof edgeWeight === 'function'
        ? edgeWeight(fromNode.id, toNode.id)
        : edgeWeight;
    if (fromNode.id === toNode.id) return;
    edges.push({
      id: generateId(),
      from: fromNode.id,
      to: toNode.id,
      weight: new Fraction(weight ?? 1),
    });
  }
  return edges;
};
