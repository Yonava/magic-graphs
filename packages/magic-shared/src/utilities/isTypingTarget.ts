const TYPING_TAGS = new Set(['INPUT', 'TEXTAREA', 'SELECT']);

export const isTypingTarget = (event: KeyboardEvent) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return false;
  return TYPING_TAGS.has(target.tagName) || target.isContentEditable;
};
