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
  const { set, remove } = graph.canvas.theme.createLayer(themeId);

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
    set('node.default.borderColor', colorSourceSink);
    set('nodeAnchor.default.color', colorSourceSink);
    set('node.default.text', labelSourceSink);
  };

  const destylize = () => {
    remove('node.default.borderColor');
    remove('nodeAnchor.default.color');
    remove('node.default.text');
  };

  return {
    stylize,
    destylize,
  };
};
