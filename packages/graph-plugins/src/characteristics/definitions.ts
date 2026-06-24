/**
 * human readable definitions for graph characteristics.
 * may contain HTML
 */
export default {
  connected:
    'A graph is <b>connected</b> if there is a path between every pair of nodes/vertices.',
  weaklyConnected:
    'A directed graph is <b>weakly connected</b> if replacing all of its directed edges with undirected edges produces a connected (undirected) graph.',
  stronglyConnected:
    'A directed graph is <b>strongly connected</b> if there is a directed path from every vertex to every other vertex.',
  stronglyConnectedComponents:
    'A <b>strongly connected component</b> or SCC in a directed graph is a maximal group of vertices where every vertex is reachable from every other vertex within the group. If you can travel between any two vertices in both directions (following the edges), they belong to the same SCC.',
  bipartite:
    'A graph is <b>bipartite</b> if its vertices can be divided into two disjoint sets U and V such that every edge connects a vertex in U to one in V.',
  acyclic:
    'A graph is <b>acyclic</b> if it has no cycles (loops). For example, A -> B -> C -> A is a cycle.',
  complete:
    'A graph is <b>complete</b> if every pair of distinct vertices is connected by a unique edge or if the graph is directed, by a pair of unique edges (one in each direction).',
  tree: 'A <b>tree</b> is a connected graph with no cycles. It is a minimally connected graph.',
  binaryTree:
    'A <b>binary tree</b> is a tree in which each node has at most two children.',
  forest: 'A <b>forest</b> is a disjoint set of trees.',
} as const;
