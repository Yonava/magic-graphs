import colors from '@colors';
import { NON_COLOR_THEMES } from './universal';
import type { GraphThemeRaw } from '../types';

const REDDISH_GRAY = 'rgb(100, 60, 70)';

export const DARK_THEME: GraphThemeRaw = {
  nodeBorderColor: colors.BLACK,
  nodeColor: colors.STONE_600,
  nodeTextColor: colors.WHITE,
  nodeFocusBorderColor: colors.RED_700,
  nodeFocusColor: REDDISH_GRAY,
  nodeFocusTextColor: colors.WHITE,
  edgeColor: colors.STONE_900,
  edgeFocusColor: colors.RED_700,
  edgeFocusTextColor: colors.WHITE,
  edgeTextColor: colors.WHITE,

  graphBgColor: colors.GRAY_600,
  graphBgPatternColor: colors.WHITE + '15',

  nodeAnchorColorWhenParentFocused: colors.RED_800,
  nodeAnchorColor: colors.GRAY_900,
  linkPreviewColor: colors.BLACK,

  marqueeSelectionBoxColor: colors.WHITE + '15',
  marqueeSelectionBoxBorderColor: colors.WHITE,
  marqueeEncapsulatedNodeBoxBorderColor: colors.RED_700,
  marqueeEncapsulatedNodeBoxColor: colors.RED_700 + '20',

  ...NON_COLOR_THEMES,
};
