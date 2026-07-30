const TYPING_TAGS = new Set(['INPUT', 'TEXTAREA', 'SELECT']);

/**
 * true when the keystroke belongs to a text-entry element, meaning it is the
 * user typing rather than reaching for a shortcut. anything listening on
 * document (shortcuts, canvas keybinds) has to bail on these or it steals
 * keystrokes out from under whatever the user is filling in.
 */
export const isTypingTarget = (event: KeyboardEvent) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return false;
  return TYPING_TAGS.has(target.tagName) || target.isContentEditable;
};
