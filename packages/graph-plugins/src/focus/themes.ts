import { ToThemeOverrides } from '@magic/graph-plugins-shared/theme/types';

import {
  EdgeThemeValues,
  NodeThemeValues,
  edgeFields,
  nodeFields,
} from '../canvas/themes.ts';

export type FocusThemes = {
  node: {
    focus: NodeThemeValues;
  };
  edge: {
    focus: EdgeThemeValues;
  };
};

export const createFocusThemeOverrides = (): ToThemeOverrides<FocusThemes> => ({
  node: {
    focus: nodeFields(),
  },
  edge: {
    focus: edgeFields(),
  },
});
