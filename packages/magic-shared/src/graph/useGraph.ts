import { useCanvas } from '@canvas/surface/index';
import { CoreOptions } from '@graph/core/options';
import { createGraph } from '@graph/create-graph/index';
import { adjacencyLists } from '@graph/plugins/adjacency-lists/index';
import { anchors } from '@graph/plugins/anchors/index';
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
import { pink } from '@graph/theme-presets/pink/index';
import { useAdjacencyLists } from '@graph/vue/useAdjacencyLists';
import { useCharacteristics } from '@graph/vue/useCharacteristics';
import { useCreateGraph } from '@graph/vue/useCreateGraph';
import { useTransitionMatrix } from '@graph/vue/useTransitionMatrix';

export type UseGraphOptions = {
  core?: Partial<CoreOptions>;
  interactive?: Partial<InteractiveOptions>;
};

export const useGraph = (options: UseGraphOptions = {}) => {
  const canvasSurface = useCanvas();

  const graph = createGraph({
    options: options.core ?? {},
    plugins: [
      canvas(canvasSurface),
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
    ],
    themePresets: {
      dark,
      light,
      pink,
    },
  });

  canvasSurface.draw.content.value = graph.canvas.aggregator.draw;

  // @ts-expect-error event hub type contravariance causing issues with strong typing
  const vueCoreWrapper = useCreateGraph(graph);
  // @ts-expect-error event hub type contravariance causing issues with strong typing
  const vueAdjacencyLists = useAdjacencyLists(graph);
  // @ts-expect-error event hub type contravariance causing issues with strong typing
  const vueCharacteristics = useCharacteristics(graph);
  // @ts-expect-error event hub type contravariance causing issues with strong typing
  const vueTransitionMatrix = useTransitionMatrix(graph);

  return {
    ...graph,
    adjacencyLists: vueAdjacencyLists,
    characteristics: vueCharacteristics,
    transitionMatrix: vueTransitionMatrix,
    ...vueCoreWrapper,
  };
};
