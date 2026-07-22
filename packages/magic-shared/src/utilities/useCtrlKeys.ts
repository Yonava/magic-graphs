import { type Binding, type Sequence, keys } from 'ctrl-keys';

import { onMounted, onUnmounted } from 'vue';

import { isTypingTarget } from './isTypingTarget.ts';

export interface CtrlKeys {
  add: (...args: Binding) => CtrlKeys;
  remove: (...args: Binding) => CtrlKeys;
  enable: (...sequence: Sequence) => CtrlKeys;
  disable: (...sequence: Sequence) => CtrlKeys;
}

export const useCtrlKeys = (): CtrlKeys => {
  const handler = keys();

  const onKeyDown = (event: KeyboardEvent) => {
    if (isTypingTarget(event)) return;
    handler.handle(event);
  };

  onMounted(() => window.addEventListener('keydown', onKeyDown));
  onUnmounted(() => window.removeEventListener('keydown', onKeyDown));

  const ctrlKeys: CtrlKeys = {
    add: (...args) => {
      handler.add(...args);
      return ctrlKeys;
    },
    remove: (...args) => {
      handler.remove(...args);
      return ctrlKeys;
    },
    enable: (...args) => {
      handler.enable(...args);
      return ctrlKeys;
    },
    disable: (...args) => {
      handler.disable(...args);
      return ctrlKeys;
    },
  };

  return ctrlKeys;
};
