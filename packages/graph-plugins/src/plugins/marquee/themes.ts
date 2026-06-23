import { Color } from '@magic/utils/colors';

import { Cursor, CursorFallback } from '../canvas/theme/cursor.ts';
import { ThemeValue, ToThemeOverrides } from '../canvas/theme/types.ts';

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
