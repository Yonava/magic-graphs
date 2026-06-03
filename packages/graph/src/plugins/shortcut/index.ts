import { keys } from 'ctrl-keys';

import { GraphWithPlugins } from '../../useGraph.ts';
import { GraphAnnotationPlugin } from '../annotations/index.ts';
import type { PlatformShortcuts } from './types.ts';

export const USER_PLATFORM = window.navigator.userAgent.includes('Mac')
  ? 'Mac'
  : 'Windows';

/**
 * a plugin that allows users to use keyboard shortcuts to interact with the graph
 */
export const useShortcuts = (
  graph: GraphWithPlugins & GraphAnnotationPlugin,
) => {
  const { settings } = graph;

  const ctrlKeysHandler = keys();

  const defaultShortcutTriggerUndo = () => {
    if (graph.annotation.isActive.value) return graph.annotation.undo();
    if (settings.value.interactive) return graph.history.undo();
  };

  const defaultShortcutTriggerRedo = () => {
    if (graph.annotation.isActive.value) graph.annotation.redo();
    if (settings.value.interactive) return graph.history.redo();
  };

  const defaultShortcutTriggerEscape = () => graph.focus.clear();
  const defaultShortcutTriggerSelectAll = () => graph.focus.all();
  const defaultShortcutTriggerDelete = () => {
    if (settings.value.interactive === false) return;
    const ids = [...graph.focus.focusedItemIds.value];
    graph.actions.removeElements({
      nodeIds: ids,
      edgeIds: ids,
    });
  };

  /**
   * get the function to run based on the keyboard shortcut setting
   */
  const getFn = (defaultFn: () => void, setting: boolean | (() => void)) => {
    if (setting === false) return () => {};
    if (typeof setting === 'function') return setting;
    return defaultFn;
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
    triggerRedo.fn = getFn(
      defaultShortcutTriggerRedo,
      settings.value.shortcutRedo,
    );
    triggerUndo.fn = getFn(
      defaultShortcutTriggerUndo,
      settings.value.shortcutUndo,
    );
    triggerEscape.fn = getFn(
      defaultShortcutTriggerEscape,
      settings.value.shortcutEscape,
    );
    triggerSelectAll.fn = getFn(
      defaultShortcutTriggerSelectAll,
      settings.value.shortcutSelectAll,
    );
    triggerDelete.fn = getFn(
      defaultShortcutTriggerDelete,
      graph.settings.value.shortcutDelete,
    );
    triggerZoomIn.fn = getFn(
      graph.canvas.magicCanvas.camera.actions.zoomIn,
      settings.value.shortcutZoomIn,
    );
    triggerZoomOut.fn = getFn(
      graph.canvas.magicCanvas.camera.actions.zoomOut,
      settings.value.shortcutZoomOut,
    );
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

  const deactivate = () => {
    graph.events.unsubscribe('onKeyDown', ctrlKeysHandler.handle);
    graph.events.unsubscribe('onSettingsChange', updateBindings);
  };

  if (settings.value.shortcuts) activate();

  graph.events.subscribe('onSettingsChange', (diff) => {
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
