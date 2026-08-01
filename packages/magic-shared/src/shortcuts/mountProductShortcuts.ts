import { MagicGraph } from '../product/useGraphProduct.ts';
import { ShortcutItem } from './useShortcuts.ts';

export const mountProductShortcuts = (graph: MagicGraph) => {
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
  ];

  for (const shortcut of shortcuts) {
    graph.magic.shortcuts.add(shortcut);
  }
};
