import { Explainer } from '@magic/shared/explainer';
import { Graph } from '@magic/shared/graph';

import { PrimsFrame } from './frame.ts';

const describeEdge = (graph: Graph, edgeId: string) => {
  const edge = graph.getEdge(edgeId);
  return `{${edge.source}}-{${edge.target}} (${edge.weight.toFraction()})`;
};

const listEdges = (graph: Graph, edgeIds: readonly string[]) => {
  const described = edgeIds.map((id) => describeEdge(graph, id));
  if (described.length <= 1) return described.join('');
  return `${described.slice(0, -1).join(', ')} and ${described.at(-1)}`;
};

export const primsExplainer =
  (graph: Graph) =>
  (frame: PrimsFrame): Explainer | undefined => {
    if (frame.type === 'start') {
      return {
        content: `Starting the [Tree] at {${frame.start}}`,
      };
    }

    if (frame.type === 'end') {
      const edges = frame.treeEdgeIds.length;
      return {
        content: `Done! The [Tree] Has ${edges} Edge${edges === 1 ? '' : 's'}`,
      };
    }

    if (frame.type === 'consider-edges') {
      return {
        content: `Considering the [Frontier]: ${listEdges(graph, frame.edges)}`,
      };
    }

    if (frame.type === 'compare-edges') {
      const left = describeEdge(graph, frame.left);
      const right = describeEdge(graph, frame.right);
      return {
        content: `Comparing ${left} to ${right}`,
      };
    }

    if (frame.type === 'select-edge') {
      const winner = describeEdge(graph, frame.edge);

      if (frame.tiedEdges) {
        const tied = listEdges(graph, frame.tiedEdges);
        return {
          content: `${tied} Are Tied for Cheapest, So ${winner} Is Chosen Arbitrarily`,
        };
      }

      return {
        content: `${winner} Has the Smallest Weight, So It Gets [Added]`,
      };
    }

    if (frame.type === 'unreachable') {
      const count = frame.nodes.length;
      return {
        content: `${count} Node${count === 1 ? '' : 's'} Never Connect to the [Tree]: the Graph Is Disconnected From {${frame.nodes[0]}}`,
      };
    }
  };
