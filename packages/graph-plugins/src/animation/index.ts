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
    actions: {
      ...stuff.actions,
      addNode: (options) => {
        if (options.animate) {
          const finalize = autoAnimate();
          const node = stuff.actions.addNode(options);
          finalize();
          return node;
        }
        return stuff.actions.addNode(options);
      },
      addEdge: (options) => {
        if (options.animate) {
          const finalize = autoAnimate();
          const edge = stuff.actions.addEdge(options);
          finalize();
          return edge;
        }
        return stuff.actions.addEdge(options);
      },
      removeNode: (options) => {
        if (options.animate) {
          const finalize = autoAnimate();
          const result = stuff.actions.removeNode(options);
          finalize();
          return result;
        }
        return stuff.actions.removeNode(options);
      },
      removeEdge: (options) => {
        if (options.animate) {
          const finalize = autoAnimate();
          const result = stuff.actions.removeEdge(options);
          finalize();
          return result;
        }
        return stuff.actions.removeEdge(options);
      },
      addElements: (options, shared) => {
        if (shared.animate) {
          const finalize = autoAnimate();
          const result = stuff.actions.addElements(options, shared);
          finalize();
          return result;
        }
        return stuff.actions.addElements(options, shared);
      },
      removeElements: (options, shared) => {
        if (shared.animate) {
          const finalize = autoAnimate();
          const result = stuff.actions.removeElements(options, shared);
          finalize();
          return result;
        }
        return stuff.actions.removeElements(options, shared);
      },
    },
    controls: {
      auto: autoAnimate,
    },
  };
};
