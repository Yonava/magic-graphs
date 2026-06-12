import { PURPLE_700, RED_700 } from '@magic/utils/colors';

import { CoreGraph } from '../../core/types.ts';
import { useTheme } from '../../plugins/canvas/themes/useTheme.ts';
import { CanvasPlugin } from '../../plugins/canvas/types.ts';
import { TUTORIAL_THEME_ID } from '../../tutorials/types.ts';
import { type TutorialStep } from '../../tutorials/types.ts';

/**
 * pre-defined tutorial steps for basic graph editing
 */
type BasicsGraph = CoreGraph & CanvasPlugin;

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
    dismiss: 'onNodeAdded',
  },
  moveNode: {
    hint: 'Drag a node to move it',
    dismiss: 'onNodeDrop',
  },
  createEdge: {
    hint: 'Create an edge by dragging an anchor onto another node',
    dismiss: 'onEdgeAdded',
  },
  createSelfDirectedEdge: {
    hint: 'You can even create self directed edges! Make sure you are in "directed" mode and drag an anchor inwards',
    dismiss: {
      event: 'onEdgeAdded',
      predicate: (edge) => edge.target === edge.source,
    },
  },
  editEdgeWeight: {
    hint: 'Edit the edge weight by clicking on it and typing a number',
    dismiss: {
      event: 'onEdgeUpdated',
      predicate: (_, { weight }) => !!weight,
    },
  },
  removeElement: getRemoveNodeOrEdgeStep(graph),
});

const getRemoveNodeOrEdgeStep = (graph: BasicsGraph): TutorialStep => {
  let stepPassed = false;
  const completeStep = () => (stepPassed = true);
  const { setTheme, removeAllThemes } =
    graph.canvas.useTheme(TUTORIAL_THEME_ID);
  return {
    hint: 'Remove an edge or node by clicking on it and hitting backspace/delete',
    dismiss: {
      event: 'onInterval',
      predicate: () => stepPassed,
    },
    onInit: () => {
      stepPassed = false;
      setTheme('nodeAnchor.default.color', (node) =>
        node.label === '1' ? PURPLE_700 : RED_700,
      );
      graph.events.subscribe('onEdgeRemoved', completeStep);
      graph.events.subscribe('onNodeRemoved', completeStep);
    },
    onDismiss: () => {
      removeAllThemes();
      graph.events.unsubscribe('onEdgeRemoved', completeStep);
      graph.events.unsubscribe('onNodeRemoved', completeStep);
    },
  };
};
