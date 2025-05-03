import type { Graph } from '@graph/types';

export class GoWithGraphGuard {
  graph: Graph;

  constructor(g: Graph) {
    this.graph = g;
  }

  /**
   * ensures all node labels are numbers
   */
  nodeLabelsAreNumbers() {
    const areAllNodeLabelsAreNumbers = this.graph.nodes.value.every((node) => {
      const label = node.label;
      return !isNaN(Number(label));
    });
    return areAllNodeLabelsAreNumbers;
  }
}
