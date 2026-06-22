import { CanvasElement } from '../canvas/themes.ts';

export const FOCUSABLE_GRAPH_TYPES: CanvasElement['graphType'][] = [
  'node',
  'edge',
];

export const FOCUS_PLUGIN_ID = 'plugins/focus';
export const FOCUS_THEME_ID = FOCUS_PLUGIN_ID + '/theme';
