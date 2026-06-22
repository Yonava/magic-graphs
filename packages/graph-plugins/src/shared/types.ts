import { ThemeController } from '../plugins/canvas/theme/createThemeController.ts';
import { ToThemeOverrides } from '../plugins/canvas/theme/types.ts';

export type Coordinate = {
  x: number;
  y: number;
};

export type WithTheme<T, Themes> = T & {
  theme: ThemeController<ToThemeOverrides<Themes>>;
};
