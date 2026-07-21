import tinycolor from 'tinycolor2';

import { Timeline } from '../../timeline/define.ts';
import { AUTO_ANIMATE_DURATION_MS } from '../constants.ts';

export const circleRemove: Timeline<'circle'> = {
  forShapes: ['circle'],
  durationMs: AUTO_ANIMATE_DURATION_MS,
  easing: { radius: 'in-out' },
  keyframes: [
    {
      progress: 1,
      properties: {
        radius: 0,
        textArea: (ta) => ({
          color: tinycolor(ta.color).setAlpha(0).toRgbString(),
          activeColor: ta.activeColor,
          textBlock: {
            ...ta.textBlock,
            color: 'transparent',
          },
        }),
      },
    },
  ],
};
