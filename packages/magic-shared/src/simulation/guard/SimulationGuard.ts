import { Graph } from '../../graph/types.ts';
import { Lens } from '../../lens/types.ts';
import { createHasNodeCheck } from './checks/hasNodes.ts';

export type Violation = {
  lens?: Lens;
  reason: string;
};

export type SimulationGuardCheck = () => Violation | undefined;

export class SimulationGuard {
  graph: Graph;
  checks: SimulationGuardCheck[] = [];

  constructor(graph: Graph) {
    this.graph = graph;
  }

  minNodes(minNodes: number) {
    const hasNodesCheck = createHasNodeCheck(this.graph, minNodes);
    this.checks.push(hasNodesCheck);
    return this;
  }

  custom(check: SimulationGuardCheck) {
    this.checks.push(check);
    return this;
  }

  runChecks() {
    for (const check of this.checks) {
      const violation = check();
      if (violation) return violation;
    }
  }
}
