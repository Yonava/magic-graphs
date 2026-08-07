import { useFullscreen } from '@vueuse/core';

import { MagicGraph } from '../product/useGraphProduct.ts';
import { ShortcutItem } from './useShortcuts.ts';

export const useProductShortcuts = (graph: MagicGraph) => {
  const fullscreen = useFullscreen();
  // TODO make it windows + mac agnostic
  const shortcuts: ShortcutItem[] = [
    {
      id: 'product/focus-all',
      key: 'meta+a',
      callback: graph.focus.setAll,
    },
    {
      id: 'product/undo',
      key: 'meta+z',
      callback: () => {
        if (!graph.history.canUndo.value) return;
        graph.history.undo();
      },
    },
    {
      id: 'product/redo',
      key: 'meta+shift+z',
      callback: () => {
        if (!graph.history.canRedo.value) return;
        graph.history.redo();
      },
    },
    {
      id: 'product/fullscreen',
      key: 'f',
      callback: fullscreen.toggle,
    },
    {
      id: 'product/toggle-component-slot-ui',
      key: 'meta+.',
      callback: graph.magic.componentSlots.visibility.toggle,
    },
  ];

  for (const shortcut of shortcuts) {
    graph.magic.shortcuts.add(shortcut);
  }
};
