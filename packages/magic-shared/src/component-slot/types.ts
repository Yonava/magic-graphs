import { Component } from 'vue';

export type SlotPosition = 'left' | 'right';

export type ComponentSlot = {
  position: SlotPosition;
  // TODO may want to enforce that the component doesn't have any required props
  // as the renderer doesn't have the ability to provide prop data!
  component: Component;
};
