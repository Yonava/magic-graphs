import { MagicGraph } from '../product/useGraphProduct.ts';
import { ShortcutItem } from './useShortcuts.ts';

export const mountProductShortcuts = (graph: MagicGraph) => {
  const shortcuts: ShortcutItem[] = [
    {
      id: 'product/focus-all',
      key: 'meta+a',
      callback: graph.focus.all,
    },
  ];

  for (const shortcut of shortcuts) {
    graph.magic.shortcuts.add(shortcut);
  }
};
