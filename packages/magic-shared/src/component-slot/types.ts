import type { Component } from 'vue';

/** Where in the GUI a component slot is rendered. */
export type SlotPosition = 'left' | 'right';

/** A component rendered into a fixed position in the GUI. */
export type ComponentSlot = {
  position: SlotPosition;
  // TODO may want to enforce that the component doesn't have any required props
  // as the renderer doesn't have the ability to provide prop data!
  component: Component;
};
