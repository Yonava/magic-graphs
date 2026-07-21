import { getRandomInRange } from '@core/utils/random';
import { CoreNode } from '@graph/primitives/types';
import { AddGNodeOptions, GNode } from '@magic/shared/graph/types';
import { MagicGraph } from '@magic/shared/product/useGraphProduct';
import { SimulationDefinition } from '@magic/shared/simulation';
import tinycolor from 'tinycolor2';

import { computed, ref } from 'vue';

import { AVLFrame } from './types.ts';
import { AVLControls } from './useAVLSimulation.ts';

const Y = 250;
const X = 800;

const POSITIONS = [
  { x: X - 200, y: Y },
  { x: X - 100, y: Y },
  { x: X, y: Y },
  { x: X + 100, y: Y },
  { x: X + 200, y: Y },
];

export const useSuggestedNodes = (
  graph: MagicGraph,
  simDefinition: SimulationDefinition<AVLFrame>,
  controls: AVLControls,
) => {
  const suggestedNodeIds = ref<Set<string>>(new Set());

  const addSuggestedNodes = () => {
    const nodeData = POSITIONS.map((v): AddGNodeOptions => ({
      label: getRandomInRange(1, 99).toString(),
      position: v,
    }));
    const { addedNodes } = graph.actions.addElements(
      { nodes: nodeData, edges: [] },
      { focus: false },
    );
    suggestedNodeIds.value = new Set(addedNodes.map((n) => n.id));
  };

  const removeSuggestedNodes = () => {
    const nodes = Array.from(suggestedNodeIds.value)
      .filter((id) => id !== controls.target.value)
      .map((id) => ({ id }));
    graph.actions.removeElements({ nodes: nodes, edges: [] }, {});
    suggestedNodeIds.value.clear();
  };

  const dimSuggested = ({ id }: CoreNode, resolveUnderneath: () => string) => {
    const isSuggested = suggestedNodeIds.value.has(id);
    if (!isSuggested) return;
    const tinycolorRes = tinycolor(resolveUnderneath());
    return tinycolorRes.setAlpha(0.5).toHex8String();
  };

  graph.theme
    .createThemer({
      canvas: {
        'node.default.color': dimSuggested,
        'node.default.text.color': dimSuggested,
        'node.default.border.color': dimSuggested,
      },
    })
    .activate();

  graph.canvas.events.subscribe('onClick', ({ topElement }) => {
    if (!topElement || !suggestedNodeIds.value.has(topElement.id)) return;
    controls.mode.value = 'insert';
    controls.target.value = graph.getNode(topElement.id).id;
    graph.magic.simulation.start(simDefinition);
  });

  return {
    add: addSuggestedNodes,
    remove: removeSuggestedNodes,
    ids: computed(() => suggestedNodeIds.value),
  };
};

export type SuggestedNodesControls = ReturnType<typeof useSuggestedNodes>;
