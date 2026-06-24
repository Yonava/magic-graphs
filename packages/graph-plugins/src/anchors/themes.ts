import { CoreNode } from '@magic/graph-core-infra/types';
import {
  Cursor,
  CursorFallback,
} from '@magic/graph-plugins-shared/theme/cursor';
import {
  ThemeValue,
  ToThemeOverrides,
} from '@magic/graph-plugins-shared/theme/types';
import { Color } from '@magic/utils/colors';

import { NodeAnchor } from './types.ts';

export type AnchorsThemes = {
  anchors: {
    default: {
      color: ThemeValue<Color, [node: CoreNode]>;
      radius: ThemeValue<number, [node: CoreNode]>;
      cursor: ThemeValue<Cursor | CursorFallback, [node: CoreNode]>;
    };
    parentFocused: {
      color: ThemeValue<Color, [node: CoreNode]>;
      radius: ThemeValue<number, [node: CoreNode]>;
      cursor: ThemeValue<Cursor | CursorFallback, [node: CoreNode]>;
    };
    linkPreview: {
      default: {
        color: ThemeValue<Color, [node: CoreNode, anchor: NodeAnchor]>;
        width: ThemeValue<number, [node: CoreNode, anchor: NodeAnchor]>;
      };
      parentFocused: {
        color: ThemeValue<Color, [node: CoreNode, anchor: NodeAnchor]>;
        width: ThemeValue<number, [node: CoreNode, anchor: NodeAnchor]>;
      };
    };
  };
};

export const createAnchorsThemeOverrides =
  (): ToThemeOverrides<AnchorsThemes> => ({
    anchors: {
      default: {
        color: [],
        cursor: [],
        radius: [],
      },
      parentFocused: {
        color: [],
        cursor: [],
        radius: [],
      },
      linkPreview: {
        default: {
          color: [],
          width: [],
        },
        parentFocused: {
          color: [],
          width: [],
        },
      },
    },
  });
