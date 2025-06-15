import { useLocalStorage } from '@vueuse/core';
import { useTheme } from '@graph/themes/useTheme';
import type { GEdge, GNode, Graph } from '@graph/types';
import colors, { adjustHex } from '@utils/colors';
import type { Color } from '@utils/colors';
import { MARKUP_USETHEME_ID } from '../constants';
import type { GraphThemeName } from '@graph/themes';

type ColorMapKey = GNode['id'] | GEdge['id'];
type ColorMapValue = Color;
export type ColorMap = Map<ColorMapKey, ColorMapValue>;

export const useMarkupColorizer = (graph: Graph) => {
  const { setTheme, removeAllThemes } = useTheme(graph, MARKUP_USETHEME_ID);

  const colorMap = useLocalStorage(
    'markup-color-map',
    new Map<ColorMapKey, ColorMapValue>(),
  );

  // TODO
  // go through all keys in the colorMap and remove inactive nodes/edges
  // for (const key of colorMap.value.keys()) {
  //   if (!graph.nodes.value[key] && !graph.edges.value[key]) {
  //     colorMap.value.delete(key);
  //   }
  // }

  const colorNode = (node: GNode) => {
    const color = colorMap.value.get(node.id);
    if (!color) return;
    return graph.baseTheme.value.nodeColor;
  };

  const colorNodeBorder = (node: GNode) => {
    const color = colorMap.value.get(node.id);
    if (!color) return;
    if (graph.focus.isFocused(node.id)) return adjustHex(color, 30);
    return color;
  };

  const colorEdge = (edge: GEdge) => {
    const color = colorMap.value.get(edge.id);
    if (!color) return;
    if (graph.focus.isFocused(edge.id)) return adjustHex(color, 30);
    return color;
  };

  const encapsulatedNodeBoxBorderColor = () => {
    const themes: Record<GraphThemeName, Color> = {
      dark: colors.WHITE,
      light: colors.BLACK,
      pink: colors.PURPLE_800,
    };

    return themes[graph.themeName.value] + '80';
  };

  const colorize = () => {
    setTheme('nodeColor', colorNode);

    setTheme('nodeBorderColor', colorNodeBorder);
    setTheme('nodeFocusBorderColor', colorNodeBorder);
    setTheme('nodeAnchorColor', colorNodeBorder);
    setTheme('nodeAnchorColorWhenParentFocused', colorNodeBorder);
    setTheme('edgeColor', colorEdge);

    setTheme('marqueeSelectionBoxColor', colors.TRANSPARENT);
    setTheme(
      'marqueeEncapsulatedNodeBoxBorderColor',
      encapsulatedNodeBoxBorderColor,
    );
    setTheme('marqueeEncapsulatedNodeBoxColor', colors.TRANSPARENT);
  };

  const decolorize = () => {
    removeAllThemes();
  };

  return {
    colorize,
    decolorize,
    colorMap,
  };
};

export type MarkupColorizerControls = ReturnType<typeof useMarkupColorizer>;
