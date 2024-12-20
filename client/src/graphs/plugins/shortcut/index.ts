import { computed } from "vue"
import type { BaseGraph } from "@graph/base"
import { useShortcutPressed } from './useShortcutPressed'
import type { GraphHistoryPlugin } from "../history"
import type { GraphFocusPlugin } from "../focus"
import type { GraphAnnotationPlugin } from "../annotations"

const USER_PLATFORM = window.navigator.userAgent.includes('Mac') ? 'Mac' : 'Windows'

/**
 * a plugin that allows users to use keyboard shortcuts to interact with the graph
 */
export const useShortcuts = (
  graph: BaseGraph & GraphHistoryPlugin & GraphFocusPlugin & GraphAnnotationPlugin,
) => {
  const { settings } = graph

  const defaultShortcutUndo = () => {
    if (graph.annotation.isActive.value) graph.annotation.undo()
    if (settings.value.interactive) {
      const action = graph.history.undo()
      if (!action) return
      // TODO focus the edges that were affected by move
      // actions as well
      graph.focus.set(action.affectedItems.map((item) => item.data.id))
    }
  }

  const defaultShortcutRedo = () => {
    if (graph.annotation.isActive.value) graph.annotation.redo()
    if (settings.value.interactive) {
      const action = graph.history.redo()
      if (!action) return
      graph.focus.set(action.affectedItems.map((item) => item.data.id))
    }
  }

  const defaultShortcutEscape = () => graph.focus.reset()
  const defaultShortcutSelectAll = () => graph.focus.all()
  const defaultShortcutDelete = () => {
    if (settings.value.interactive === false) return
    graph.bulkRemoveNode([...graph.focus.focusedItemIds.value])
    graph.bulkRemoveEdge([...graph.focus.focusedItemIds.value])
  }

  /**
   * get the function to run based on the keyboard shortcut setting
   */
  const getFn = (defaultFn: () => void, setting: boolean | (() => void)) => {
    if (setting === false) return () => { }
    if (typeof setting === 'function') return setting
    return defaultFn
  }

  const shortcutRedo = computed(() => getFn(defaultShortcutRedo, settings.value.shortcutRedo))
  const shortcutUndo = computed(() => getFn(defaultShortcutUndo, settings.value.shortcutUndo))
  const shortcutEscape = computed(() => getFn(defaultShortcutEscape, settings.value.shortcutEscape))
  const shortcutSelectAll = computed(() => getFn(defaultShortcutSelectAll, settings.value.shortcutSelectAll))
  const shortcutDelete = computed(() => getFn(defaultShortcutDelete, settings.value.shortcutDelete))

  const bindings = computed(() => ({
    Mac: {
      ['Meta+Z']: shortcutUndo.value,
      ['Shift+Meta+Z']: shortcutRedo.value,
      ['Meta+Shift+Z']: shortcutRedo.value,
      ['Backspace']: shortcutDelete.value,
      ['Meta+A']: shortcutSelectAll.value,
      ['Escape']: shortcutEscape.value,
    },
    Windows: {
      ['Control+Z']: shortcutUndo.value,
      ['Shift+Control+Z']: shortcutRedo.value,
      ['Control+Shift+Z']: shortcutRedo.value,
      ['Backspace']: shortcutDelete.value,
      ['Control+A']: shortcutSelectAll.value,
      ['Escape']: shortcutEscape.value,
    },
  }))

  const { isPressed } = useShortcutPressed()

  const handleKeyboardEvents = (ev: KeyboardEvent) => {
    if (graph.canvasFocused.value === false) return
    const binding = bindings.value[USER_PLATFORM]
    for (const key in binding) {
      if (!isPressed(key)) continue
      binding[key as keyof typeof binding]()
      ev.preventDefault()
      return
    }
  }

  const activate = () => {
    graph.subscribe('onKeyDown', handleKeyboardEvents)
  }

  const deactivate = () => {
    graph.unsubscribe('onKeyDown', handleKeyboardEvents)
  }

  if (settings.value.shortcuts) activate()

  graph.subscribe('onSettingsChange', (diff) => {
    if (diff.shortcuts === true) activate()
    else if (diff.shortcuts === false) deactivate()
  })

  return {
    /**
     * functions computed to mirror the actions of the keyboard shortcuts.
     * invoking these are the API equivalent of pressing the keyboard shortcuts
     */
    trigger: {
      delete: shortcutDelete,
      selectAll: shortcutSelectAll,
      escape: shortcutEscape,
      redo: shortcutRedo,
      undo: shortcutUndo,
    }
  }
}