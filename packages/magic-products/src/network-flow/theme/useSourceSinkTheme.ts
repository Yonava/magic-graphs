import colors from '@core/utils/colors';

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
  const canvas = graph.canvas.theme.createLayer(themeId);
  const anchors = graph.anchors.theme.createLayer(themeId);

  const isSource = ({ id }: { id: string }) => sourceNode.get(graph)?.id === id;
  const isSink = ({ id }: { id: string }) => sinkNode.get(graph)?.id === id;

  const colorSourceSink = ({ id }: { id: string }) => {
    if (graph.focus.isFocused(id)) return;

    if (isSource({ id })) return SOURCE_COLOR;
    else if (isSink({ id })) return SINK_COLOR;
  };

  const labelSourceSink = ({ id }: { id: string }) => {
    if (isSource({ id })) return SOURCE_LABEL;
    else if (isSink({ id })) return SINK_LABEL;
  };

  const stylize = () => {
    canvas.set('node.default.border.color', colorSourceSink);
    canvas.set('node.default.text.content', labelSourceSink);
    anchors.set('anchors.default.color', colorSourceSink);
  };

  const destylize = () => {
    canvas.remove('node.default.border.color');
    canvas.remove('node.default.text.content');
    anchors.remove('anchors.default.color');
  };

  return {
    stylize,
    destylize,
  };
};
