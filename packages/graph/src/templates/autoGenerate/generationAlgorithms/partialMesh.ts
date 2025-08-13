import type { AutoGenerateGraphOptions } from '../../../templates/autoGenerate/types';
import type { GEdge, GNode } from '../../../types';
import { generateId } from '@magic/utils/id';

type GeneratePartialMeshOptions = {
  edgeLabel: AutoGenerateGraphOptions['edgeLabel'];
  connectionProbability: number;
  maxConnectionsPerNode: number;
};

type PartialGeneratePartialMeshOptions = Partial<GeneratePartialMeshOptions>;

const GENERATE_PARTIAL_MESH_DEFAULTS = {
  edgeLabel: '1',
  connectionProbability: 0.5,
  maxConnectionsPerNode: Infinity,
} as const;

export const generatePartialMesh = (
  nodes: GNode[],
  options: PartialGeneratePartialMeshOptions = {},
) => {
  const { edgeLabel, connectionProbability, maxConnectionsPerNode } = {
    ...GENERATE_PARTIAL_MESH_DEFAULTS,
    ...options,
  };

  const edges: GEdge[] = [];
  const connections = new Map<string, number>();
  const existingEdges = new Set<string>();

  nodes.forEach((node) => connections.set(node.id, 0));

  const addEdge = (from: string, to: string) => {
    const edgeKey = `${from}-${to}`;
    if (existingEdges.has(edgeKey)) return;

    const label =
      typeof edgeLabel === 'function' ? edgeLabel(from, to) : edgeLabel!;
    edges.push({
      id: generateId(),
      from,
      to,
      label,
    });
    connections.set(from, (connections.get(from) || 0) + 1);
    connections.set(to, (connections.get(to) || 0) + 1);
    existingEdges.add(edgeKey);
    existingEdges.add(`${to}-${from}`);
  };

  for (let i = 0; i < nodes.length - 1; i++) {
    addEdge(nodes[i].id, nodes[i + 1].id);
  }

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (Math.random() < connectionProbability) {
        const nodeA = nodes[i].id;
        const nodeB = nodes[j].id;

        if (
          (connections.get(nodeA) || 0) < maxConnectionsPerNode &&
          (connections.get(nodeB) || 0) < maxConnectionsPerNode
        ) {
          addEdge(nodeA, nodeB);
        }
      }
    }
  }

  return edges;
};
