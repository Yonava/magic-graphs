import { useTheme } from '@magic/graph/themes/useTheme';
import type { GNode } from '@magic/graph/types';
import type { Graph } from '../../shared/useGraphWithCanvas.ts';
import colors from '@magic/utils/colors';

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
  const { setTheme, removeTheme } = useTheme(graph, themeId);

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
    setTheme('node.base.borderColor', colorSourceSink);
    setTheme('nodeAnchor.base.color', colorSourceSink);
    setTheme('node.base.text', labelSourceSink);
  };

  const destylize = () => {
    removeTheme('node.base.borderColor');
    removeTheme('nodeAnchor.base.color');
    removeTheme('node.base.text');
  };

  return {
    stylize,
    destylize,
  };
};
