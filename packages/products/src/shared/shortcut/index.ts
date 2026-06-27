import { keys } from 'ctrl-keys';

import { GraphWithPlugins } from '../useGraph.ts';
import type { PlatformShortcuts } from './types.ts';

export const USER_PLATFORM = window.navigator.userAgent.includes('Mac')
  ? 'Mac'
  : 'Windows';

/**
 * a plugin that allows users to use keyboard shortcuts to interact with the graph
 */
export const useShortcuts = (graph: GraphWithPlugins) => {
  const { settings } = graph;

  const ctrlKeysHandler = keys();

  const defaultShortcutTriggerUndo = () => {
    if (settings.value.interactive) return graph.history.undo();
  };

  const defaultShortcutTriggerRedo = () => {
    if (settings.value.interactive) return graph.history.redo();
  };

  const defaultShortcutTriggerEscape = () => graph.focus.clear();
  const defaultShortcutTriggerSelectAll = () => graph.focus.all();
  const defaultShortcutTriggerDelete = () => {
    if (settings.value.interactive === false) return;
    const ids = [...graph.focus.focusedElementIds.value].map((id) => ({ id }));
    graph.actions.removeElements({ nodes: ids, edges: ids }, {});
  };

  const notImplemented = () => console.warn('not implemented');
  const triggerRedo = { fn: notImplemented };
  const triggerUndo = { fn: notImplemented };
  const triggerEscape = { fn: notImplemented };
  const triggerSelectAll = { fn: notImplemented };
  const triggerDelete = { fn: notImplemented };
  const triggerZoomIn = { fn: notImplemented };
  const triggerZoomOut = { fn: notImplemented };

  const updateBindings = () => {
    triggerRedo.fn = defaultShortcutTriggerRedo;
    triggerUndo.fn = defaultShortcutTriggerUndo;
    triggerEscape.fn = defaultShortcutTriggerEscape;
    triggerSelectAll.fn = defaultShortcutTriggerSelectAll;
    triggerDelete.fn = defaultShortcutTriggerDelete;
    triggerZoomIn.fn = graph.canvas.magicCanvas.camera.actions.zoomIn;
    triggerZoomOut.fn = graph.canvas.magicCanvas.camera.actions.zoomOut;
  };

  const allShortcuts: PlatformShortcuts = {
    Mac: {
      Undo: {
        binding: 'meta+z',
        trigger: () => triggerUndo.fn(),
      },
      Redo: {
        binding: 'meta+shift+z',
        trigger: () => triggerRedo.fn(),
      },
      Delete: {
        binding: 'backspace',
        trigger: () => triggerDelete.fn(),
      },
      'Select All': {
        binding: 'meta+a',
        trigger: () => triggerSelectAll.fn(),
      },
      Deselect: {
        binding: 'esc',
        trigger: () => triggerEscape.fn(),
      },
      'Zoom In': {
        binding: '=',
        trigger: () => triggerZoomIn.fn(),
      },
      'Zoom Out': {
        binding: '-',
        trigger: () => triggerZoomOut.fn(),
      },
    },
    Windows: {
      Undo: {
        binding: 'ctrl+z',
        trigger: () => triggerUndo.fn(),
      },
      Redo: {
        binding: 'ctrl+shift+z',
        trigger: () => triggerRedo.fn(),
      },
      Delete: {
        binding: 'backspace',
        trigger: () => triggerDelete.fn(),
      },
      'Select All': {
        binding: 'ctrl+a',
        trigger: () => triggerSelectAll.fn(),
      },
      Deselect: {
        binding: 'escape',
        trigger: () => triggerEscape.fn(),
      },
      'Zoom In': {
        binding: '=',
        trigger: () => triggerZoomIn.fn(),
      },
      'Zoom Out': {
        binding: '-',
        trigger: () => triggerZoomOut.fn(),
      },
    },
  };

  // adds the keyboard shortcuts to the ctrlKeysHandler
  const shortcutValues = Object.values(allShortcuts[USER_PLATFORM]);
  for (const keyboardShortcut of shortcutValues) {
    const typedBinding = keyboardShortcut.binding;
    ctrlKeysHandler.add(typedBinding, (e) => {
      e?.preventDefault();
      keyboardShortcut.trigger();
    });
  }

  const activate = () => {
    graph.events.subscribe('onKeyDown', ctrlKeysHandler.handle);
    graph.events.subscribe('onSettingsChange', updateBindings);
  };

  activate();

  return {
    /**
     * shortcuts computed based on the platform (mac/windows) the user
     * is currently on
     */
    activeShortcuts: allShortcuts[USER_PLATFORM],
    /**
     * trigger functions computed to mirror the keyboard shortcuts.
     * invoking these are the API equivalent to pressing the keyboard shortcuts
     */
    trigger: {
      delete: triggerDelete,
      selectAll: triggerSelectAll,
      escape: triggerEscape,
      redo: triggerRedo,
      undo: triggerUndo,
    },
  };
};
