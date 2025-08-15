type GenerateClusterNodesOptions = {
  clusterCount: number;
  maxNodesPerCluster: number;
  minDistance: number;
  clusterSpread: number;
};

export type PartialGenerateClusterNodesOptions =
  Partial<GenerateClusterNodesOptions>;

export const GENERATE_CLUSTER_GRAPH_DEFAULTS = {
  clusterCount: 1,
  maxNodesPerCluster: 12,
  minDistance: 200,
  clusterSpread: 350,
} as const;

type GenerateCohesiveEdgesOptions = {
  maxEdgesPerNode: number;
  connectionProbability: number;
  maxNeighbors: number;
  minAngleBetweenEdges: number;
  edgeLabel: string | ((fromNode: string, toNode: string) => string);
  allowUTurnEdges: boolean;
  allowBidirectionalEdges: boolean;
};

export type PartialGenerateCohesiveEdgesOptions =
  Partial<GenerateCohesiveEdgesOptions>;

export const GENERATE_COHESIVE_EDGES_DEFAULTS = {
  maxEdgesPerNode: 10,
  connectionProbability: 0.8,
  maxNeighbors: 4,
  minAngleBetweenEdges: Math.PI / 6,
  edgeLabel: '1',
  allowUTurnEdges: false,
  allowBidirectionalEdges: false,
} as const;

export type AutoGenerateGraphOptions = PartialGenerateClusterNodesOptions &
  PartialGenerateCohesiveEdgesOptions & {};

export const AUTO_GENERATE_GRAPH_DEFAULTS = {
  ...GENERATE_COHESIVE_EDGES_DEFAULTS,
  ...GENERATE_CLUSTER_GRAPH_DEFAULTS,
} as const;
