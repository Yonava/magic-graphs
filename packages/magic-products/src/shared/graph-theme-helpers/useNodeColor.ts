import type { Color } from '@core/utils/colors';

import type { MaybeRef } from 'vue';

import type { GNode } from '../useGraph.ts';
import { Graph } from '../useGraphWithCanvas.ts';

type ColorMap = Map<GNode['id'], Color>;
type ColorGetter = (nodeId: GNode['id']) => Color | undefined;

export const useNodeColor = (
  graph: Graph,
  mapOrGetter: MaybeRef<ColorMap> | ColorGetter,
  themeId: string,
) => {
  const get = (nodeId: GNode['id']) => {
    if (typeof mapOrGetter === 'function') return mapOrGetter(nodeId);
    if ('value' in mapOrGetter) return mapOrGetter.value.get(nodeId);
    return mapOrGetter.get(nodeId);
  };

  const canvas = graph.canvas.theme.createLayer(themeId);
  const anchors = graph.anchors.theme.createLayer(themeId);

  const nodeColor = (nodeId: GNode['id']) => {
    if (graph.focus.isFocused(nodeId)) return;
    return get(nodeId);
  };

  const color = () => {
    canvas.set('node.default.border.color', ({ id }) => nodeColor(id));
    anchors.set('anchors.default.color', ({ id }) => nodeColor(id));
  };

  const uncolor = () => {
    canvas.remove('node.default.border.color');
    anchors.remove('anchors.default.color');
  };

  return {
    color,
    uncolor,

    get,
  };
};
