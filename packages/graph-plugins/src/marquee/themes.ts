import { Color } from '@magic/utils/colors';

import {
  Cursor,
  CursorFallback,
} from '../../../graph-plugins-shared/src/theme/cursor.ts';
import {
  ThemeValue,
  ToThemeOverrides,
} from '../../../graph-plugins-shared/src/theme/types.ts';

export type MarqueeThemes = {
  marquee: {
    color: ThemeValue<Color>;
    borderColor: ThemeValue<Color>;
    borderWidth: ThemeValue<number>;
    encapsulatedNodeBox: {
      color: ThemeValue<Color>;
      borderColor: ThemeValue<Color>;
      borderWidth: ThemeValue<number>;
      cursor: ThemeValue<Cursor | CursorFallback>;
    };
  };
};

export const createMarqueeThemeOverrides =
  (): ToThemeOverrides<MarqueeThemes> => ({
    marquee: {
      color: [],
      borderColor: [],
      borderWidth: [],
      encapsulatedNodeBox: {
        color: [],
        borderColor: [],
        borderWidth: [],
        cursor: [],
      },
    },
  });
