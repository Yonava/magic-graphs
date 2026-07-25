// Toggle is wrapped in a Tooltip trigger here (unlike the plain ToggleButton),
// and TooltipTrigger's own `data-state` (open/closed) clobbers Toggle's
// `data-state` (on/off) when merged via as-child, so pressed styling keys off
// `aria-pressed` instead, which Tooltip never touches.
export const toggleIconButton = {
  dark: 'bg-gray-900 text-white hover:bg-gray-700 aria-pressed:bg-gray-700',
  light:
    'bg-gray-300 text-gray-900 hover:bg-gray-100 active:bg-gray-100 aria-pressed:bg-gray-100',
};
