/** Lifecycle handle for a set of theme overrides. */
export type Themer = {
  /** Applies the theme overrides to graph. */
  activate: () => void;
  /** Removes the theme overrides from graph. */
  deactivate: () => void;
};
