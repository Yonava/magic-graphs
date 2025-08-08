import colors from '@colors';

import type { GraphThemeRaw } from '../types';
import { NON_COLOR_THEMES } from './universal';

export const PINK_THEME: GraphThemeRaw = {
  nodeColor: colors.PINK_100,
  nodeBorderColor: colors.PINK_400,
  nodeFocusBorderColor: colors.PURPLE_600,
  nodeFocusColor: colors.PURPLE_200,
  nodeTextColor: colors.PINK_600,
  nodeFocusTextColor: colors.PURPLE_900,

  edgeColor: colors.PINK_600,
  edgeTextColor: colors.PINK_600,
  edgeFocusColor: colors.PURPLE_600,
  edgeFocusTextColor: colors.PURPLE_600,

  graphBgColor: colors.PINK_300,
  graphBgPatternColor: colors.PURPLE_200,

  nodeAnchorColor: colors.PINK_500,
  nodeAnchorColorWhenParentFocused: colors.PURPLE_700,
  linkPreviewColor: colors.PINK_900,

  marqueeSelectionBoxColor: colors.PINK_300 + '15',
  marqueeSelectionBoxBorderColor: colors.PINK_500,
  marqueeEncapsulatedNodeBoxBorderColor: colors.PINK_700,
  marqueeEncapsulatedNodeBoxColor: colors.PINK_700 + '05',

  ...NON_COLOR_THEMES,
};
