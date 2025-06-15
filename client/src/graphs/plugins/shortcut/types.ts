import type { Key } from "ctrl-keys";

/**
 * a keyboard shortcut
 */
export type Shortcut = {
  /**
   * a string of characters that defines the sequence of the shortcut
   * @example 'meta+shift+z'
   */
  binding: Key;
  /**
   * the function that fires when the shortcut is activated
   */
  trigger: () => void;
};

/**
 * maps the names of shortcuts to a corresponding shortcut definition
 */
export type Shortcuts = Record<string, Shortcut>;

/**
 * splits up the shortcuts by platform as many shortcuts
 * are platform specific
 */
export type PlatformShortcuts = {
  Mac: Shortcuts;
  Windows: Shortcuts;
};
