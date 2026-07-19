// shared interaction/color states, no border or radius: those differ between
// a standalone ToggleButton and one segment of a ToggleButtonGroup.
export const toggleButtonBaseClasses =
  'inline-flex cursor-pointer items-center justify-center gap-1 bg-transparent px-3 py-2 text-md font-bold text-neutral-900 transition-colors hover:bg-neutral-100 active:scale-[0.98] active:bg-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-400 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100 data-[state=on]:bg-neutral-900 data-[state=on]:text-white data-[state=on]:hover:bg-neutral-700';

export const toggleButtonClasses = `${toggleButtonBaseClasses} rounded-md border border-neutral-300 data-[state=on]:border-neutral-900`;
