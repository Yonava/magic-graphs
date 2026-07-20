// shared interaction/color states, no border or radius: those differ between
// a standalone ToggleButton and one segment of a ToggleButtonGroup.
export const toggleButtonBaseClasses =
  'inline-flex cursor-pointer items-center justify-center gap-1 px-3 py-2 text-md font-bold transition-colors active:scale-[0.98]';

export const toggleButtonClasses = `${toggleButtonBaseClasses} rounded-md`;
