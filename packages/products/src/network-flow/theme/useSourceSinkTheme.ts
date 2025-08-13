import { useTheme } from '@magic/graph/themes/useTheme';
import type { GNode, Graph } from '@magic/graph/types';
import colors from '@utils/colors';

import { FLOW_USETHEME_ID, SINK_LABEL, SOURCE_LABEL } from '../constants';
import state from '../state';

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
    setTheme('nodeBorderColor', colorSourceSink);
    setTheme('nodeAnchorColor', colorSourceSink);
    setTheme('nodeText', labelSourceSink);
  };

  const destylize = () => {
    removeTheme('nodeBorderColor');
    removeTheme('nodeAnchorColor');
    removeTheme('nodeText');
  };

  return {
    stylize,
    destylize,
  };
};
