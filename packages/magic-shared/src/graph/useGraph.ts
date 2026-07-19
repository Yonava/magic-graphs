import { useCanvas } from '@canvas/surface/index';
import { CanvasProps } from '@canvas/surface/types';
import { CoreOptions } from '@graph/core/options';
import { createGraph } from '@graph/create-graph/index';
import { adjacencyLists } from '@graph/plugins/adjacency-lists/index';
import { anchors } from '@graph/plugins/anchors/index';
import { animation } from '@graph/plugins/animation/index';
import { canvas } from '@graph/plugins/canvas/index';
import { characteristics } from '@graph/plugins/characteristics/index';
import { focus } from '@graph/plugins/focus/index';
import { history } from '@graph/plugins/history/index';
import { interactive } from '@graph/plugins/interactive/index';
import { InteractiveOptions } from '@graph/plugins/interactive/options';
import { marquee } from '@graph/plugins/marquee/index';
import { nodeDrag } from '@graph/plugins/node-drag/index';
import { nodeLabel } from '@graph/plugins/node-label/index';
import { transitionMatrix } from '@graph/plugins/transition-matrix/index';
import { dark } from '@graph/theme-presets/dark/index';
import { light } from '@graph/theme-presets/light/index';
import { useAdjacencyLists } from '@graph/vue/useAdjacencyLists';
import { useCharacteristics } from '@graph/vue/useCharacteristics';
import { useCreateGraphTheme } from '@graph/vue/useCreateGraphTheme';
import { useFocus } from '@graph/vue/useFocus';
import { useNodesEdges } from '@graph/vue/useNodesEdges';
import { useTransitionMatrix } from '@graph/vue/useTransitionMatrix';

export type UseGraphOptions = {
  core?: Partial<CoreOptions>;
  interactive?: Partial<InteractiveOptions>;
};

const graphPlugins = (
  options: UseGraphOptions & { canvasSurface: CanvasProps },
) => [
  canvas(options.canvasSurface),
  history,
  focus,
  marquee,
  anchors,
  nodeDrag,
  nodeLabel,
  adjacencyLists,
  transitionMatrix,
  characteristics,
  interactive(options.interactive ?? {}),
  animation,
];

const createGraphWithPlugins = (
  options: UseGraphOptions & { canvasSurface: CanvasProps },
) =>
  createGraph({
    options: options.core ?? {},
    plugins: graphPlugins(options),
    themePresets: {
      dark,
      light,
    },
  });

export const useGraph = (options: UseGraphOptions = {}) => {
  const canvasSurface = useCanvas();

  const graph = createGraphWithPlugins({ ...options, canvasSurface });

  canvasSurface.draw.content.value = graph.canvas.aggregator.draw;

  const vueThemeWrapper = useCreateGraphTheme(graph.theme);
  const vueNodesEdges = useNodesEdges(graph.events.structural, graph);
  const vueAdjacencyLists = useAdjacencyLists(
    graph.events.structural,
    graph.adjacencyLists,
  );
  const vueCharacteristics = useCharacteristics(
    graph.events.structural,
    graph.characteristics,
  );
  const vueTransitionMatrix = useTransitionMatrix(
    graph.events.structural,
    graph.transitionMatrix,
  );
  const vueFocus = useFocus(graph.focus);

  return {
    ...graph,
    ...vueNodesEdges,
    adjacencyLists: vueAdjacencyLists,
    characteristics: vueCharacteristics,
    transitionMatrix: vueTransitionMatrix,
    focus: vueFocus,
    theme: vueThemeWrapper,
  };
};
