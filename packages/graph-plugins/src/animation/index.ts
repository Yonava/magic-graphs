import { getCtx } from '@core/utils/ctx/index';

import { AnimationPlugin } from './types.ts';

export const animation: AnimationPlugin = ({ controls }) => {
  const autoAnimate = () =>
    controls.canvas.renderer.autoAnimate.captureFrame(() =>
      controls.canvas.aggregator.draw(
        getCtx(controls.canvas.magicCanvas.canvas),
      ),
    );

  return {
    name: 'animation',
    controls: {
      auto: autoAnimate,
    },
  };
};
