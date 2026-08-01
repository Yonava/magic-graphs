import { getCtx } from '@core/utils/ctx/index';

import { AnimationPlugin } from './types.ts';

export const animation: AnimationPlugin = ({ controls, actions }) => {
  const autoAnimate = () =>
    controls.canvas.renderer.autoAnimate.captureFrame(() =>
      controls.canvas.aggregator.draw(
        getCtx(controls.canvas.magicCanvas.canvas),
      ),
    );

  return {
    name: 'animation',
    actions: {
      ...actions,
      addNode: (options) => {
        if (options.animate) {
          const finalize = autoAnimate();
          const node = actions.addNode(options);
          finalize();
          return node;
        }
        return actions.addNode(options);
      },
      addEdge: (options) => {
        if (options.animate) {
          const finalize = autoAnimate();
          const edge = actions.addEdge(options);
          finalize();
          return edge;
        }
        return actions.addEdge(options);
      },
      removeNode: (options) => {
        if (options.animate) {
          const finalize = autoAnimate();
          const result = actions.removeNode(options);
          finalize();
          return result;
        }
        return actions.removeNode(options);
      },
      removeEdge: (options) => {
        if (options.animate) {
          const finalize = autoAnimate();
          const result = actions.removeEdge(options);
          finalize();
          return result;
        }
        return actions.removeEdge(options);
      },
      addElements: (options, shared) => {
        if (shared.animate) {
          const finalize = autoAnimate();
          const result = actions.addElements(options, shared);
          finalize();
          return result;
        }
        return actions.addElements(options, shared);
      },
      removeElements: (options, shared) => {
        if (shared.animate) {
          const finalize = autoAnimate();
          const result = actions.removeElements(options, shared);
          finalize();
          return result;
        }
        return actions.removeElements(options, shared);
      },
    },
    controls: {
      auto: autoAnimate,
    },
  };
};
