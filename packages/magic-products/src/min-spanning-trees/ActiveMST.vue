<script setup lang="ts">
  import HStackVue from '@magic/shared/HStack';
  import NodeVue from '@magic/shared/Node';
  import VStackVue from '@magic/shared/VStack';
  import WellVue from '@magic/shared/Well';
  import { useProvidedGraph } from '@magic/shared/product';

  const graph = useProvidedGraph();

  type Mst = (typeof graph.minimumSpanningTrees.all.value.msts)[number];

  type Neighbors = Map<string, string[]>;

  const mstNeighbors = (mst: Mst) => {
    const neighbors: Neighbors = new Map();
    const link = (from: string, to: string) => {
      const existing = neighbors.get(from);
      if (existing) existing.push(to);
      else neighbors.set(from, [to]);
    };
    for (const edge of mst) {
      link(edge.source, edge.target);
      link(edge.target, edge.source);
    }
    return neighbors;
  };

  /** breadth first search returning the node furthest from `origin` and the tree it walked */
  const furthestFrom = (neighbors: Neighbors, origin: string) => {
    const parents = new Map<string, string | null>([[origin, null]]);
    const queue = [origin];
    let furthest = origin;
    for (let i = 0; i < queue.length; i++) {
      const current = queue[i];
      furthest = current;
      for (const neighbor of neighbors.get(current) ?? []) {
        if (parents.has(neighbor)) continue;
        parents.set(neighbor, current);
        queue.push(neighbor);
      }
    }
    return { furthest, parents };
  };

  /**
   * Orders one tree as a walk from one end of its longest path to the other.
   * Nodes hanging off that path render beside the node they attach to, so
   * every node in the row shares an edge with one already placed.
   */
  const chainTree = (neighbors: Neighbors, origin: string) => {
    // two searches find the longest path in a tree, the second from a true end
    const start = furthestFrom(neighbors, origin).furthest;
    const { furthest: end, parents } = furthestFrom(neighbors, start);

    const spine: string[] = [];
    for (
      let current: string | null = end;
      current !== null;
      current = parents.get(current) ?? null
    ) {
      spine.unshift(current);
    }

    const visited = new Set(spine);
    const chain: string[] = [];

    for (const spineNode of spine) {
      chain.push(spineNode);

      const stack = (neighbors.get(spineNode) ?? []).filter(
        (neighbor) => !visited.has(neighbor),
      );
      while (stack.length > 0) {
        const branchNode = stack.pop();
        if (branchNode === undefined || visited.has(branchNode)) continue;
        visited.add(branchNode);
        chain.push(branchNode);
        for (const neighbor of neighbors.get(branchNode) ?? []) {
          if (!visited.has(neighbor)) stack.push(neighbor);
        }
      }
    }

    return chain;
  };

  const mstNodes = (mst: Mst) => {
    const neighbors = mstNeighbors(mst);
    const placed = new Set<string>();
    const nodeIds: string[] = [];

    // a disconnected graph yields a forest, so chain each tree in turn
    for (const origin of neighbors.keys()) {
      if (placed.has(origin)) continue;
      for (const id of chainTree(neighbors, origin)) {
        placed.add(id);
        nodeIds.push(id);
      }
    }

    return nodeIds;
  };
</script>

<template>
  <WellVue>
    <VStackVue class="gap-4">
      <HStackVue v-for="mst in graph.minimumSpanningTrees.all.value.msts">
        <NodeVue
          v-for="id in mstNodes(mst)"
          :key="id"
          :id="id"
        />
      </HStackVue>
    </VStackVue>
  </WellVue>
</template>
