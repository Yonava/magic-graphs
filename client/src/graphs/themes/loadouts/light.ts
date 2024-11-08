import colors from '@colors'
import type { GraphTheme } from '@graph/themes'
import { NON_COLOR_THEMES } from './universal'

export const LIGHT_THEME: GraphTheme = {
  nodeColor: colors.GRAY_50,
  nodeBorderColor: colors.GRAY_800,
  nodeFocusBorderColor: colors.BLUE_600,
  nodeFocusColor: colors.BLUE_100,
  nodeTextColor: colors.GRAY_900,
  nodeFocusTextColor: colors.GRAY_900,
  edgeColor: colors.GRAY_800,
  edgeTextColor: colors.GRAY_900,
  edgeFocusColor: colors.BLUE_600,
  edgeFocusTextColor: colors.BLACK,
  graphBgColor: colors.GRAY_200,
  graphBgPatternColor: colors.BLACK + '15',

  nodeAnchorColor: colors.BLACK,
  nodeAnchorColorWhenParentFocused: colors.BLUE_900,
  linkPreviewColor: colors.BLACK,

  marqueeSelectionBoxColor: colors.BLUE_300 + '15',
  marqueeSelectionBoxBorderColor: colors.BLUE_500,

  ...NON_COLOR_THEMES,
}