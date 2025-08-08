import type { Graph } from '@graph/types';
import { useCycleColorizer } from '@product/sandbox/ui/GraphInfoMenu/useCycleColorizer';
import type { DeepReadonly } from 'ts-essentials';

import { CANT_RUN_REASONS } from './constants';
import { useNodeEdgeTheme } from './theme/useNodeEdgeThemer';
import type { Reason } from './types';

/**
 * determines if the simulation can run.
 * returning a {@link Reason} fails the check for `Reason`, otherwise it passes.
 * simulations must pass all checks to clear {@link SimulationGuard.check}
 */
export type SimulationGuardCheck = () => DeepReadonly<Reason> | undefined;

/**
 * a builder to create a guard for simulations to ensure the graph is compatible
 * with the simulation before running it
 */
export class SimulationGuard {
  graph: Graph;
  checks: SimulationGuardCheck[] = [];

  color: ReturnType<typeof useNodeEdgeTheme>;
  cycle: ReturnType<typeof useCycleColorizer>;

  constructor(g: Graph) {
    this.graph = g;
    this.color = useNodeEdgeTheme(this.graph);
    this.cycle = useCycleColorizer(this.graph);
  }

  /**
   * ensures the graph is weighted
   */
  weighted() {
    const isWeighted = () => {
      if (this.graph.settings.value.displayEdgeLabels) return;
      return {
        themer: this.color.edges(),
        ...CANT_RUN_REASONS.NOT_WEIGHTED,
      };
    };

    this.checks.push(isWeighted);
    return this;
  }

  /**
   * ensures the graph is unweighted
   */
  unweighted() {
    const isUnweighted = () => {
      if (!this.graph.settings.value.displayEdgeLabels) return;
      return {
        themer: this.color.edges(),
        ...CANT_RUN_REASONS.NOT_UNWEIGHTED,
      };
    };

    this.checks.push(isUnweighted);
    return this;
  }

  /**
   * ensures the graph is directed
   */
  directed() {
    const isDirected = () => {
      if (this.graph.settings.value.isGraphDirected) return;
      return {
        themer: this.color.edges(),
        ...CANT_RUN_REASONS.NOT_DIRECTED,
      };
    };

    this.checks.push(isDirected);
    return this;
  }

  /**
   * ensures the graph is undirected
   */
  undirected() {
    const isUndirected = () => {
      if (!this.graph.settings.value.isGraphDirected) return;
      return {
        themer: this.color.edges(),
        ...CANT_RUN_REASONS.NOT_UNDIRECTED,
      };
    };

    this.checks.push(isUndirected);
    return this;
  }

  /**
   * ensures the graph has at least `minNodes` nodes
   * @param minNodes the minimum number of nodes
   */
  minNodes(minNodes: number) {
    const hasNodes = () => {
      if (this.graph.nodes.value.length >= minNodes) return;
      return {
        themer: this.color.nodes(),
        ...CANT_RUN_REASONS.NOT_ENOUGH_NODES(minNodes),
      };
    };

    this.checks.push(hasNodes);
    return this;
  }

  /**
   * ensures the graph has at least `minEdges` edges
   * @param minEdges the minimum number of edges
   */
  minEdges(minEdges: number) {
    const hasEdges = () => {
      if (this.graph.edges.value.length >= minEdges) return;
      return {
        themer: this.color.edges(),
        ...CANT_RUN_REASONS.NOT_ENOUGH_EDGES(minEdges),
      };
    };

    this.checks.push(hasEdges);
    return this;
  }

  /**
   * ensures the graph is connected
   */
  connected() {
    const isConnected = () => {
      if (this.graph.characteristics.isConnected.value) return;
      return CANT_RUN_REASONS.NOT_CONNECTED;
    };

    this.checks.push(isConnected);
    return this;
  }

  /**
   * ensures the graph is acyclic
   */
  acyclic() {
    const isAcyclic = () => {
      if (this.graph.characteristics.isAcyclic.value) return;
      return {
        themer: {
          theme: this.cycle.colorize,
          untheme: this.cycle.decolorize,
        },
        ...CANT_RUN_REASONS.NOT_ACYCLIC,
      };
    };

    this.checks.push(isAcyclic);
    return this;
  }

  /**
   * ensures the graph is bipartite
   */
  bipartite() {
    const isBipartite = () => {
      if (this.graph.characteristics.isBipartite.value) return;
      return CANT_RUN_REASONS.NOT_BIPARTITE;
    };

    this.checks.push(isBipartite);
    return this;
  }

  /**
   * ensures every edge on the graph has either 0 or positive weight/label
   */
  nonNegativeEdgeWeights() {
    const nonNegativeWeights = () => {
      const negativeEdgeIds = this.graph.edges.value
        .filter((e) => this.graph.helpers.getEdgeWeight(e.id) < 0)
        .map((e) => e.id);

      if (negativeEdgeIds.length === 0) return;
      return {
        themer: this.color.edges(negativeEdgeIds),
        ...CANT_RUN_REASONS.NEGATIVE_EDGE_WEIGHTS,
      };
    };

    this.checks.push(nonNegativeWeights);
    return this;
  }

  /**
   * ensures the graph has positive edge weights
   */
  positiveEdgeWeights() {
    const positiveWeights = () => {
      const negativeOrZeroEdgeIds = this.graph.edges.value
        .filter((e) => this.graph.helpers.getEdgeWeight(e.id) <= 0)
        .map((e) => e.id);

      if (negativeOrZeroEdgeIds.length === 0) return;
      return {
        themer: this.color.edges(negativeOrZeroEdgeIds),
        ...CANT_RUN_REASONS.NON_POSITIVE_EDGE_WEIGHTS,
      };
    };

    this.checks.push(positiveWeights);
    return this;
  }

  /**
   * ensures no edge starts and ends at the same node
   */
  noSelfReferencingEdges() {
    const noSelfReferencing = () => {
      const selfReferencingEdgeIds = this.graph.edges.value
        .filter((e) => e.from === e.to)
        .map((e) => e.id);

      if (selfReferencingEdgeIds.length === 0) return;
      return {
        themer: this.color.edges(selfReferencingEdgeIds),
        ...CANT_RUN_REASONS.NO_SELF_REFERENCING_EDGES,
      };
    };

    this.checks.push(noSelfReferencing);
    return this;
  }

  /**
   * ensures the graph has no bidirectional edges
   * ie two nodes linked by two edges in opposite directions
   */
  noBidirectionalEdges() {
    const noBidirectional = () => {
      const { bidirectionalEdges } = this.graph.characteristics;
      const edgeIds = bidirectionalEdges.value.map((e) => e.id);
      if (edgeIds.length === 0) return;
      return {
        themer: this.color.edges(edgeIds),
        ...CANT_RUN_REASONS.NO_BIDIRECTIONAL_EDGES,
      };
    };

    this.checks.push(noBidirectional);
    return this;
  }

  /**
   * a wildcard check for anything that may make the graph not compatible with the simulation
   *
   * @param predicate a function that returns `false` if the simulation cannot run
   * @param invalidationReason the reason why the graph cannot run the simulation
   */
  valid(predicate: () => boolean, invalidationReason: Reason) {
    const isInvalid = () => {
      if (!predicate()) return invalidationReason;
    };

    this.checks.push(isInvalid);
    return this;
  }

  /**
   * @returns the final check function that run all the checks
   */
  build() {
    return () => {
      for (const check of this.checks) {
        const reason = check();
        if (reason) return reason;
      }
    };
  }

  /**
   * checks if the simulation can run on the graph.
   * @returns a {@link Reason} if it cant or `undefined` if it can
   */
  check() {
    return this.build()();
  }
}
