import {
  Cursor,
  CursorFallback,
} from '@magic/graph-plugins-shared/theme/cursor';
import {
  ThemeValue,
  ToThemeOverrides,
} from '@magic/graph-plugins-shared/theme/types';
import { Color } from '@magic/utils/colors';

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
