import { Graph } from '../../graph/types.ts';
import { Lens } from '../../lens/types.ts';
import { createHasNodeCheck } from './checks/hasNodes.ts';

export type Violation = {
  id: string;
  lens?: Lens;
  reason: string;
};

export type GuardCheck = () => Violation | undefined;

export class SimulationGuardBuilder {
  graph: Graph;
  checks: GuardCheck[] = [];

  constructor(graph: Graph) {
    this.graph = graph;
  }

  minNodes(minNodes: number) {
    const hasNodesCheck = createHasNodeCheck(this.graph, minNodes);
    this.checks.push(hasNodesCheck);
    return this;
  }

  custom(check: GuardCheck) {
    this.checks.push(check);
    return this;
  }

  build(): GuardCheck {
    return () => {
      for (const check of this.checks) {
        const violation = check();
        if (violation) return violation;
      }
    };
  }
}
