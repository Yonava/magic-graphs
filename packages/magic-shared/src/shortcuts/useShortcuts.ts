import { Callback, Key } from 'ctrl-keys';

import { ComputedRef, computed, ref } from 'vue';

import { useCtrlKeys } from '../utilities/useCtrlKeys.ts';

export type ShortcutItem = {
  id: string;
  key: Key;
  callback: Callback;
};

export type ShortcutControls = {
  shortcuts: ComputedRef<ShortcutItem[]>;
  add: (shortcut: ShortcutItem) => void;
  remove: (id: ShortcutItem['id']) => void;
};

export const useShortcuts = (): ShortcutControls => {
  const ctrlKeys = useCtrlKeys();

  // TODO make it windows + mac agnostic
  // .add('meta+a', (d) => graph.focus.all);

  const shortcuts = ref<ShortcutItem[]>([]);

  return {
    shortcuts: computed(() => shortcuts.value),
    add: (shortcut) => {
      shortcuts.value.push(shortcut);
      ctrlKeys.add(shortcut.key, shortcut.callback);
    },
    remove: (id) => {
      const shortcut = shortcuts.value.find((s) => s.id === id);
      if (!shortcut) return;
      shortcuts.value = shortcuts.value.filter((s) => s.id !== id);
      ctrlKeys.remove(shortcut.key, shortcut.callback);
    },
  };
};
