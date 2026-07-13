import { ComponentSlot } from '../component-slot/types.ts';

/**
 * A perspective in which to view or frame properties of a graph.
 * Defines component slots plus setup/teardown for whatever effects that perspective requires.
 */
export type Lens = {
  id: string;
  /** Component slots this lens renders into the GUI. */
  components?: Omit<ComponentSlot, 'id'>[];
  /** Applies whatever this lens does when it becomes active. Not restricted to theming, can be any side effect in the spirit of a lens. */
  setup: () => void;
  /** Reverses everything setup did, restoring prior state when the lens becomes inactive. */
  teardown: () => void;
};
