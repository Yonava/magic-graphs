export type GraphAddon<T> = T & {
  // TODO find a better name for addOnControls
  addOnControls: {
    /** enable add-on */
    activate: () => void;
    /** disable add-on */
    deactivate: () => void;
  };
};
