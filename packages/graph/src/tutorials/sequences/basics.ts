import { PURPLE_700, RED_700 } from '@magic/utils/colors';

import { CoreControls } from '../../core/types.ts';
import { CanvasPlugin } from '../../plugins/canvas/types.ts';
import { TUTORIAL_THEME_ID } from '../../tutorials/types.ts';
import { type TutorialStep } from '../../tutorials/types.ts';

/**
 * pre-defined tutorial steps for basic graph editing
 */
type BasicsGraph = CoreControls & CanvasPlugin;

// @ts-expect-error migration: will complain that base graph events do not include
// onNodeDrop
export const BASICS_STEPS: (
  graph: BasicsGraph,
) => Record<string, TutorialStep> = (graph: BasicsGraph) => ({
  greeting: {
    hint: 'Welcome to the graph editor tutorial',
    dismiss: 'onClick',
  },
  goodbye: {
    hint: 'Have fun editing graphs!',
    dismiss: 'onTimeout',
    after: 3000,
  },
  createNode: {
    hint: 'Double click anywhere to add a node',
    dismiss: 'onNodesAdded',
  },
  moveNode: {
    hint: 'Drag a node to move it',
    dismiss: 'onNodeDrop',
  },
  createEdge: {
    hint: 'Create an edge by dragging an anchor onto another node',
    dismiss: 'onEdgesAdded',
  },
  createSelfDirectedEdge: {
    hint: 'You can even create self directed edges! Make sure you are in "directed" mode and drag an anchor inwards',
    dismiss: {
      event: 'onEdgesAdded',
      predicate: (edges) => edges.some((edge) => edge.target === edge.source),
    },
  },
  editEdgeWeight: {
    hint: 'Edit the edge weight by clicking on it and typing a number',
    dismiss: {
      event: 'onEdgeUpdated',
      predicate: (_, { weight }) => !!weight,
    },
  },
});
