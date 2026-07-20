// keyed off aria-pressed rather than data-state: when this is wrapped in a
// Tooltip trigger, TooltipTrigger's own data-state (open/closed) clobbers
// Toggle's data-state (on/off) via the as-child attrs merge, but aria-pressed
// is untouched by Tooltip either way.
export const toggleButton = {
  dark: 'bg-gray-900 text-white aria-pressed:bg-gray-700',
  light: 'bg-gray-300 text-black aria-pressed:bg-gray-100',
};
