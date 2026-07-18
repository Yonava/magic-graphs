import { getRandomInRange } from '@core/utils/random';
import { AddGNodeOptions } from '@magic/shared/graph/types';
import { MagicGraph } from '@magic/shared/product/useGraphProduct';
import { SimulationDefinition } from '@magic/shared/simulation';
import { createThemer } from '@magic/shared/themer/useThemer';
import tinycolor from 'tinycolor2';

import { computed, ref } from 'vue';

import { AVLFrame } from './types.ts';
import { AVLControls } from './useAVLSimulation.ts';

const POSITIONS = [
  { x: 700, y: 300 },
  { x: 800, y: 300 },
  { x: 900, y: 300 },
];

export const useSuggestedNodes = (
  graph: MagicGraph,
  simDefinition: SimulationDefinition<AVLFrame>,
  controls: AVLControls,
) => {
  const suggestedNodeIds = ref<Set<string>>(new Set());

  const addSuggestedNodes = () => {
    const nodeData = POSITIONS.map((v): AddGNodeOptions => ({
      label: getRandomInRange(1, 10).toString(),
      position: v,
    }));
    const { addedNodes } = graph.actions.addElements(
      { nodes: nodeData, edges: [] },
      {},
    );
    suggestedNodeIds.value = new Set(addedNodes.map((n) => n.id));
  };

  const removeSuggestedNodes = () => {
    const nodes = Array.from(suggestedNodeIds.value).map((id) => ({ id }));
    graph.actions.removeElements({ nodes: nodes, edges: [] }, {});
    suggestedNodeIds.value.clear();
  };

  const dimSuggested = (
    { id }: { id: string },
    resolveUnderneath: () => string,
  ) => {
    const isSuggested = suggestedNodeIds.value.has(id);
    if (!isSuggested) return;
    const tinycolorRes = tinycolor(resolveUnderneath());
    return tinycolorRes.setAlpha(0.5).toHex8String();
  };

  createThemer(graph, {
    canvas: {
      'node.default.color': dimSuggested,
      'node.default.text.color': dimSuggested,
      'node.default.border.color': dimSuggested,
    },
  }).activate();

  graph.events.subscribe('onClick', ({ elements }) => {
    const topElement = elements.at(-1);
    if (!topElement || !suggestedNodeIds.value.has(topElement.id)) return;
    controls.target.value = graph.getNode(topElement.id).id;
    graph.magic.simulation.start(simDefinition);
  });

  return {
    add: addSuggestedNodes,
    remove: removeSuggestedNodes,
    ids: computed(() => suggestedNodeIds.value),
  };
};
