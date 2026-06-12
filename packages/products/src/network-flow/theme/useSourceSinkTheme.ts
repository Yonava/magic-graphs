import type { GNode } from '@magic/graph/types';
import colors from '@magic/utils/colors';

import type { Graph } from '../../shared/useGraphWithCanvas.ts';
import { FLOW_USETHEME_ID, SINK_LABEL, SOURCE_LABEL } from '../constants.ts';
import state from '../state.ts';

const { sourceNode, sinkNode } = state;

const SOURCE_COLOR = colors.BLUE_600;
const SINK_COLOR = colors.RED_600;

/**
 * colors and labels the source and sink nodes
 */
export const useSourceSinkTheme = (
  graph: Graph,
  themeId = FLOW_USETHEME_ID,
) => {
  const { setTheme, removeTheme } = graph.canvas.useTheme(themeId);

  const isSource = (node: GNode) => sourceNode.get(graph)?.id === node.id;
  const isSink = (node: GNode) => sinkNode.get(graph)?.id === node.id;

  const colorSourceSink = (node: GNode) => {
    if (graph.focus.isFocused(node.id)) return;

    if (isSource(node)) return SOURCE_COLOR;
    else if (isSink(node)) return SINK_COLOR;
  };

  const labelSourceSink = (node: GNode) => {
    if (isSource(node)) return SOURCE_LABEL;
    else if (isSink(node)) return SINK_LABEL;
  };

  const stylize = () => {
    setTheme('node.default.borderColor', colorSourceSink);
    setTheme('nodeAnchor.default.color', colorSourceSink);
    setTheme('node.default.text', labelSourceSink);
  };

  const destylize = () => {
    removeTheme('node.default.borderColor');
    removeTheme('nodeAnchor.default.color');
    removeTheme('node.default.text');
  };

  return {
    stylize,
    destylize,
  };
};
