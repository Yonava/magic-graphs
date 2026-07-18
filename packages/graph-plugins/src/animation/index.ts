import { getCtx } from '@core/utils/ctx/index';

import { AnimationPlugin } from './types.ts';

export const animation: AnimationPlugin = ({ controls, ...stuff }) => {
  const autoAnimate = () =>
    controls.canvas.shapes.autoAnimate.captureFrame(() =>
      controls.canvas.aggregator.draw(
        getCtx(controls.canvas.magicCanvas.canvas),
      ),
    );

  return {
    name: 'animation',
    ...stuff,
    controls: {
      auto: autoAnimate,
    },
  };
};
