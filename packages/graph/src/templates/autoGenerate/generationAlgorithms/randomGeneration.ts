import { LETTERS, graphLabelGetter } from '../../../labels';
import type {
  PartialGenerateClusterNodesOptions,
  PartialGenerateCohesiveEdgesOptions,
} from '../../../templates/autoGenerate/types';
import {
  GENERATE_CLUSTER_GRAPH_DEFAULTS,
  GENERATE_COHESIVE_EDGES_DEFAULTS,
} from '../../../templates/autoGenerate/types';
import type { GEdge, GNode } from '../../../types';
import { angleDifference } from '@magic/shapes/helpers';
import { generateId } from '@magic/utils/id';

import { ref } from 'vue';

/**
 * Generates an array of nodes distributed across multiple clusters.
 *
 * @param clusterCount - The number of clusters to generate.
 * @param maxNodesPerCluster - The number of nodes per cluster.
 * @param minDistance - The minimum distance between nodes in a cluster.
 * @param clusterSpread - The maximum radius for nodes in a cluster.
 * @returns An array of nodes distributed across multiple clusters.
 */
export const generateClusterNodes = (
  options: PartialGenerateClusterNodesOptions = {},
): GNode[] => {
  const { clusterCount, maxNodesPerCluster, minDistance, clusterSpread } = {
    ...GENERATE_CLUSTER_GRAPH_DEFAULTS,
    ...options,
  };

  const nodes = ref<GNode[]>([]);

  const minJump = 5;
  const maxJump = 20;

  const clusterCenters = Array.from({ length: clusterCount }, () => ({
    x: Math.random() * (clusterSpread * 2) + clusterSpread,
    y: Math.random() * (clusterSpread * 2) + clusterSpread,
  }));

  clusterCenters.forEach((center) => {
    const angleStep = (2 * Math.PI) / maxNodesPerCluster;

    const getLabel = graphLabelGetter(nodes, LETTERS);

    for (let i = 0; i < maxNodesPerCluster; i++) {
      const angle = angleStep * i * (Math.random() / 10 + 1);
      let radius = minDistance;
      let x: number, y: number;
      let outwardSteps = 0;

      do {
        radius += Math.random() * (maxJump - minJump) + minJump;
        x = center.x + Math.cos(angle) * radius;
        y = center.y + Math.sin(angle) * radius;
        outwardSteps++;
      } while (
        nodes.value.some(
          (node) => Math.hypot(node.x - x, node.y - y) < minDistance,
        ) &&
        outwardSteps < 100
      );

      nodes.value.push({
        id: generateId(),
        label: getLabel(),
        x,
        y,
      });
    }
  });

  return nodes.value;
};

/**
 * Generates random edges between nodes.
 *
 * @param nodes - An array of nodes.
 * @param maxEdgesPerNode - The maximum number of edges each node can have.
 * @param connectionProbability - The probability of a node being connected to another node.
 * @param maxNeighbors - The maximum number of neighbors a node can have.
 * @param minAngleBetweenEdges - The minimum angle between edges `IN RADIANS`.
 * @returns An array of edges between nodes.
 */
export const generateCohesiveEdges = (
  nodes: GNode[],
  options: PartialGenerateCohesiveEdgesOptions = {},
): GEdge[] => {
  const {
    maxEdgesPerNode,
    connectionProbability,
    maxNeighbors,
    minAngleBetweenEdges,
    edgeLabel,
    allowUTurnEdges,
    allowBidirectionalEdges,
  } = {
    ...GENERATE_COHESIVE_EDGES_DEFAULTS,
    ...options,
  };

  const edges: GEdge[] = [];
  const usedConnections = new Map<string, Set<string>>();

  const addConnection = (from: string, to: string) => {
    if (!usedConnections.has(from)) usedConnections.set(from, new Set());
    usedConnections.get(from)!.add(to);

    const label =
      typeof edgeLabel === 'function' ? edgeLabel(from, to) : edgeLabel;
    edges.push({
      id: generateId(),
      from,
      to,
      label,
    });
  };

  const distance = (a: GNode, b: GNode): number =>
    Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);

  const connectedNodes = new Set<string>();
  const unconnectedNodes = new Set(nodes.map((node) => node.id));
  const startNode = nodes[0];
  connectedNodes.add(startNode.id);
  unconnectedNodes.delete(startNode.id);

  while (unconnectedNodes.size > 0) {
    let closestPair: {
      from: GNode['id'];
      to: GNode['id'];
      dist: number;
    } | null = null;

    for (const fromId of connectedNodes) {
      const fromNode = nodes.find((node) => node.id === fromId);

      if (!fromNode) continue;

      for (const toId of unconnectedNodes) {
        const toNode = nodes.find((node) => node.id === toId);
        if (!toNode) continue;

        const dist = distance(fromNode, toNode);
        if (!closestPair || dist < closestPair.dist) {
          closestPair = { from: fromNode.id, to: toNode.id, dist };
        }
      }
    }

    if (closestPair) {
      const { from, to } = closestPair;

      addConnection(from, to);
      connectedNodes.add(to);
      unconnectedNodes.delete(to);
    }
  }

  if (allowUTurnEdges && maxEdgesPerNode >= 2) {
    const uTurnNodes = nodes.filter(() => Math.random() < 0.3);

    uTurnNodes.forEach((node) => {
      addConnection(node.id, node.id);
    });
  }

  nodes.forEach((fromNode) => {
    const potentialConnections = nodes
      .filter((toNode) => fromNode.id !== toNode.id) // remove self
      .map((toNode) => ({
        toNode,
        dist: distance(fromNode, toNode),
      }))
      .sort((a, b) => a.dist - b.dist)
      .slice(0, maxNeighbors);

    let edgesAdded = 0;

    for (const { toNode, dist } of potentialConnections) {
      if (edgesAdded >= maxEdgesPerNode) break;

      const prob = connectionProbability * Math.exp(-dist / 500);
      if (
        Math.random() <= prob &&
        !usedConnections.get(fromNode.id)?.has(toNode.id)
      ) {
        const newPotentialEdgeAngle = Math.atan2(
          toNode.y - fromNode.y,
          toNode.x - fromNode.x,
        );
        const angleCheck = edges
          .filter((e) => e.from === fromNode.id || e.to === fromNode.id)
          .every((e) => {
            const otherNode = nodes.find((node) =>
              e.from === fromNode.id ? node.id === e.to : node.id === e.from,
            );
            if (!otherNode) {
              return false;
            }
            const otherNodeAngle = Math.atan2(
              otherNode.y - fromNode.y,
              otherNode.x - fromNode.x,
            );
            const angleDiff = angleDifference(
              newPotentialEdgeAngle,
              otherNodeAngle,
            );
            return angleDiff > minAngleBetweenEdges;
          });

        if (angleCheck) {
          addConnection(fromNode.id, toNode.id);
          edgesAdded++;
        }
      }
    }
  });

  if (allowBidirectionalEdges) {
    edges.forEach((edge) => {
      if (Math.random() < 0.1) {
        addConnection(edge.to, edge.from);
      }
    });
  }

  return edges;
};
