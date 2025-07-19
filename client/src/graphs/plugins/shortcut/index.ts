import type { BaseGraph } from '@graph/base';
import type { GraphHistoryPlugin } from '../history';
import type { GraphFocusPlugin } from '../focus';
import type { GraphAnnotationPlugin } from '../annotations';
import keys from 'ctrl-keys';
import type { PlatformShortcuts } from './types';

export const USER_PLATFORM = window.navigator.userAgent.includes('Mac')
  ? 'Mac'
  : 'Windows';

/**
 * a plugin that allows users to use keyboard shortcuts to interact with the graph
 */
export const useShortcuts = (
  graph: BaseGraph &
    GraphHistoryPlugin &
    GraphFocusPlugin &
    GraphAnnotationPlugin,
) => {
  const { settings } = graph;

  const ctrlKeysHandler = keys();

  const defaultShortcutTriggerUndo = () => {
    if (graph.annotation.isActive.value) graph.annotation.undo();
    if (settings.value.interactive) {
      const action = graph.history.undo();
      if (!action) return;
      graph.focus.set(action.affectedItems.map((item) => item.data.id));
    }
  };

  const defaultShortcutTriggerRedo = () => {
    if (graph.annotation.isActive.value) {
      graph.annotation.redo();
      return;
    }
    if (settings.value.interactive) {
      const action = graph.history.redo();
      if (!action) return;
      graph.focus.set(action.affectedItems.map((item) => item.data.id));
    }
  };

  const defaultShortcutTriggerEscape = () => graph.focus.reset();
  const defaultShortcutTriggerSelectAll = () => graph.focus.all();
  const defaultShortcutTriggerDelete = () => {
    if (settings.value.interactive === false) return;
    graph.bulkRemoveNode([...graph.focus.focusedItemIds.value]);
    graph.bulkRemoveEdge([...graph.focus.focusedItemIds.value]);
  };

  /**
   * get the function to run based on the keyboard shortcut setting
   */
  const getFn = (defaultFn: () => void, setting: boolean | (() => void)) => {
    if (setting === false) return () => { };
    if (typeof setting === 'function') return setting;
    return defaultFn;
  };

  const triggerRedo = { fn: () => console.warn('not implemented') }
  const triggerUndo = { fn: () => console.warn('not implemented') }
  const triggerEscape = { fn: () => console.warn('not implemented') }
  const triggerSelectAll = { fn: () => console.warn('not implemented') }
  const triggerDelete = { fn: () => console.warn('not implemented') }
  const triggerZoomIn = { fn: () => console.warn('not implemented') }
  const triggerZoomOut = { fn: () => console.warn('not implemented') }

  const updateBindings = () => {
    triggerRedo.fn = getFn(defaultShortcutTriggerRedo, settings.value.shortcutRedo)
    triggerUndo.fn = getFn(defaultShortcutTriggerUndo, settings.value.shortcutUndo)
    triggerEscape.fn = getFn(defaultShortcutTriggerEscape, settings.value.shortcutEscape)
    triggerSelectAll.fn = getFn(defaultShortcutTriggerSelectAll, settings.value.shortcutSelectAll)
    triggerDelete.fn = getFn(defaultShortcutTriggerDelete, graph.settings.value.shortcutDelete)
    triggerZoomIn.fn = getFn(graph.magicCanvas.camera.actions.zoomIn, settings.value.shortcutZoomIn)
    triggerZoomOut.fn = getFn(graph.magicCanvas.camera.actions.zoomOut, settings.value.shortcutZoomOut)
  }

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
  }

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
    graph.subscribe('onKeyDown', ctrlKeysHandler.handle);
    graph.subscribe('onSettingsChange', updateBindings);
  };

  const deactivate = () => {
    graph.unsubscribe('onKeyDown', ctrlKeysHandler.handle);
    graph.unsubscribe('onSettingsChange', updateBindings);
  };

  if (settings.value.shortcuts) activate();

  graph.subscribe('onSettingsChange', (diff) => {
    if (diff.shortcuts === true) activate();
    else if (diff.shortcuts === false) deactivate();
  });

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
