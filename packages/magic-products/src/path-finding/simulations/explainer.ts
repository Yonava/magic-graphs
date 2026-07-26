import { Graph } from '@magic/shared/graph';
import { Explainer, ExplainerHighlight } from '@magic/shared/simulation';

import { PathFindingFrame, formatDistance } from './frame.ts';
import { slotIds } from './shared.ts';

const componentSlotHighlight = (
  slot: keyof typeof slotIds,
): ExplainerHighlight => ({
  activate: (graph) => graph.magic.componentSlots.setHighlighted(slotIds[slot]),
  deactivate: (graph) => graph.magic.componentSlots.clearHighlighted(),
});

const highlights = {
  distances: {
    tooltipLabel: 'The cheapest trip we know to each node so far',
    ...componentSlotHighlight('distances'),
  },
  improve: {
    tooltipLabel: 'A cheaper way in! Write the new distance down',
    ...componentSlotHighlight('distances'),
  },
  keep: {
    tooltipLabel: 'The trip we already had is no worse, so nothing changes',
    ...componentSlotHighlight('distances'),
  },
  frontier: {
    tooltipLabel: 'Everything discovered but not yet finalized, cheapest first',
    ...componentSlotHighlight('frontier'),
  },
  matrix: {
    tooltipLabel: 'The cheapest trip we know between every pair of nodes',
    ...componentSlotHighlight('matrix'),
  },
} as const satisfies Record<string, ExplainerHighlight>;

export const pathFindingExplainer =
  (graph: Graph) =>
  (frame: PathFindingFrame): Explainer | undefined => {
    if (frame.type === 'start') {
      if (!frame.source) {
        return {
          content: 'Seeding the [Table] with the Edges We Already Have',
          highlights: [highlights.matrix],
        };
      }
      return {
        content: `Starting at {${frame.source}}. Every Other Node Is an ∞ Away in [Distances]`,
        highlights: [highlights.distances],
      };
    }

    if (frame.type === 'end') {
      if (frame.matrix) {
        return {
          content: "Done! Every Pair's Shortest Trip Is in the [Table]",
          highlights: [highlights.matrix],
        };
      }
      return {
        content: `Done! The [Distances] from {${frame.anchorNodeId}} Are as Short as They Get`,
        highlights: [highlights.distances],
      };
    }

    if (frame.type === 'settle-node') {
      return {
        content: `Cheapest in the [Frontier] is {${frame.node}} at ${formatDistance(frame.distance)}, So That Distance Is Final`,
        highlights: [highlights.frontier],
      };
    }

    if (frame.type === 'relax-edge') {
      const { weight } = graph.getEdge(frame.edge);
      return {
        content: `Taking the Edge from {${frame.from}} to {${frame.to}}, Which Costs ${weight.toFraction()}`,
      };
    }

    if (frame.type === 'improve-distance') {
      return {
        content: `${formatDistance(frame.newDistance)} Beats ${formatDistance(frame.oldDistance)}, So [Improving] {${frame.node}}`,
        highlights: [highlights.improve],
      };
    }

    if (frame.type === 'keep-distance') {
      return {
        content: `{${frame.node}} Is Already ${formatDistance(frame.distance)} Away and ${formatDistance(frame.offered)} Is No Better, So [Keeping] It`,
        highlights: [highlights.keep],
      };
    }

    if (frame.type === 'unreachable') {
      const count = frame.nodes.length;
      return {
        content: `${count} Node${count === 1 ? '' : 's'} Stayed at ∞ in [Distances]: Nothing Leads There`,
        highlights: [highlights.distances],
      };
    }

    if (frame.type === 'begin-pass') {
      return {
        content: `Pass ${frame.pass} of ${frame.totalPasses}: Sweeping Every Edge Once More`,
      };
    }

    if (frame.type === 'pass-settled') {
      return {
        content: `Pass ${frame.pass} Changed Nothing, So No Later Pass Will Either. [Distances] Are Final`,
        highlights: [highlights.distances],
      };
    }

    if (frame.type === 'negative-cycle') {
      return {
        content: `{${frame.node}} Can Still Get Cheaper! A Negative Cycle Means No Shortest Path Exists`,
      };
    }

    if (frame.type === 'choose-pivot') {
      return {
        content: `Pivot ${frame.pivotNumber} of ${frame.totalPivots}: Can Detouring Through {${frame.node}} Beat the [Table]?`,
        highlights: [highlights.matrix],
      };
    }

    if (frame.type === 'consider-pair') {
      return {
        content: `{${frame.from}} to {${frame.to}} via {${frame.pivot}} Costs ${formatDistance(frame.viaPivot)}, Against ${formatDistance(frame.direct)} Today`,
      };
    }

    if (frame.type === 'improve-pair') {
      return {
        content: `The Detour Wins, So [Updating] {${frame.from}} to {${frame.to}} to ${formatDistance(frame.newDistance)}`,
        highlights: [highlights.matrix],
      };
    }

    if (frame.type === 'keep-pair') {
      return {
        content: `{${frame.from}} to {${frame.to}} Is Already ${formatDistance(frame.distance)}, So the Detour Through {${frame.pivot}} Is No Help`,
      };
    }
  };
