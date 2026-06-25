import { ThemeOverrides } from '@magic/graph-plugins-shared/theme/types';

import { EdgeThemeValues, NodeThemeValues } from '../canvas/themes.ts';

export type FocusThemes = {
  'node.focus.text.content': NodeThemeValues['text'];
  'node.focus.text.size': NodeThemeValues['textSize'];
  'node.focus.text.color': NodeThemeValues['textColor'];
  'node.focus.text.fontWeight': NodeThemeValues['textFontWeight'];
  'node.focus.size': NodeThemeValues['size'];
  'node.focus.border.width': NodeThemeValues['borderWidth'];
  'node.focus.border.color': NodeThemeValues['borderColor'];
  'node.focus.color': NodeThemeValues['color'];
  'node.focus.cursor': NodeThemeValues['cursor'];
  'edge.focus.text.content': EdgeThemeValues['text'];
  'edge.focus.text.size': EdgeThemeValues['textSize'];
  'edge.focus.text.color': EdgeThemeValues['textColor'];
  'edge.focus.text.fontWeight': EdgeThemeValues['textFontWeight'];
  'edge.focus.color': EdgeThemeValues['color'];
  'edge.focus.width': EdgeThemeValues['width'];
  'edge.focus.cursor': EdgeThemeValues['cursor'];
};

export const createFocusThemeOverrides = (): ThemeOverrides<FocusThemes> => ({
  'node.focus.text.content': [],
  'node.focus.text.size': [],
  'node.focus.text.color': [],
  'node.focus.text.fontWeight': [],
  'node.focus.size': [],
  'node.focus.border.width': [],
  'node.focus.border.color': [],
  'node.focus.color': [],
  'node.focus.cursor': [],
  'edge.focus.text.content': [],
  'edge.focus.text.size': [],
  'edge.focus.text.color': [],
  'edge.focus.text.fontWeight': [],
  'edge.focus.color': [],
  'edge.focus.width': [],
  'edge.focus.cursor': [],
});
