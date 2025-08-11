import type { TransitionMatrix } from '@graph/useTransitionMatrix';

export type DijkstrasResult = number[];

/**
 * matrix trace because "nodes" correspond to the indices of the
 * nodes in graph.nodes
 */
export type DijkstrasMatrixTrace = {
  queue: { node: number; distance: number }[];
  currentNode?: number;
  distances: number[];
}[];

class PriorityQueue {
  private heap: { node: number; distance: number }[] = [];

  constructor() {}

  enqueue(node: number, distance: number) {
    this.heap.push({ node, distance });
    this.bubbleUp(this.heap.length - 1);
  }

  dequeue(): { node: number; distance: number } | undefined {
    if (this.heap.length === 0) return undefined;

    const min = this.heap[0];
    const last = this.heap.pop()!;

    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.bubbleDown(0);
    }

    return min;
  }

  private bubbleUp(index: number) {
    const element = this.heap[index];

    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIndex];

      if (element.distance >= parent.distance) break;

      this.heap[parentIndex] = element;
      this.heap[index] = parent;
      index = parentIndex;
    }
  }

  private bubbleDown(index: number) {
    const length = this.heap.length;
    const element = this.heap[index];

    while (true) {
      let swap: number | null = null;
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;

      if (leftChildIndex < length) {
        const leftChild = this.heap[leftChildIndex];
        if (leftChild.distance < element.distance) {
          swap = leftChildIndex;
        }
      }

      if (rightChildIndex < length) {
        const rightChild = this.heap[rightChildIndex];
        if (
          (swap === null && rightChild.distance < element.distance) ||
          (swap !== null &&
            rightChild.distance < this.heap[leftChildIndex].distance)
        ) {
          swap = rightChildIndex;
        }
      }

      if (swap === null) break;

      this.heap[index] = this.heap[swap];
      this.heap[swap] = element;
      index = swap;
    }
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  peek(): { node: number; distance: number } | undefined {
    return this.heap[0];
  }

  getHeap(): Array<{ node: number; distance: number }> {
    return [...this.heap];
  }
}

export const dijkstras = (graph: TransitionMatrix, source: number) => {
  const trace: DijkstrasMatrixTrace = [];

  const runDijkstras = (graph: TransitionMatrix, source: number) => {
    const nodeCount = graph.length;

    // Distances array to store shortest distances from source
    const distances: number[] = new Array(nodeCount).fill(
      Number.POSITIVE_INFINITY,
    );

    // Previous node to reconstruct path
    const previousNode: (number | null)[] = new Array(nodeCount).fill(null);

    // Priority queue to efficiently find minimum distance node
    const pq = new PriorityQueue();

    // Trace initial queue state
    trace.push({
      queue: pq.getHeap(),
      distances: distances.slice(),
    });

    // Distance to source node is always 0
    distances[source] = 0;
    pq.enqueue(source, 0);

    // Find shortest path for all nodes
    while (!pq.isEmpty()) {
      // Select the node with minimum distance
      const { node: currentNode } = pq.dequeue()!;

      // Trace current node and queue state
      trace.push({
        currentNode,
        queue: pq.getHeap(),
        distances: distances.slice(),
      });

      // Update distances for adjacent nodes
      for (let adjacentNode = 0; adjacentNode < nodeCount; adjacentNode++) {
        const edgeWeight = graph[currentNode][adjacentNode];

        // Check if there's an edge and path through current node is shorter
        if (
          edgeWeight > 0 &&
          distances[currentNode] !== Number.POSITIVE_INFINITY &&
          distances[currentNode] + edgeWeight < distances[adjacentNode]
        ) {
          // Update distance
          distances[adjacentNode] = distances[currentNode] + edgeWeight;
          previousNode[adjacentNode] = currentNode;

          // Add to priority queue
          pq.enqueue(adjacentNode, distances[adjacentNode]);
        }
      }
    }

    // Trace final queue state
    trace.push({
      queue: pq.getHeap(),
      distances: distances.slice(),
    });

    return distances;
  };

  const res = runDijkstras(graph, source);

  return {
    res,
    trace,
  };
};
