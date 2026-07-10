import { ComponentSlotControls } from '../component-slot/useComponentSlots.ts';
import type { Lens } from './types.ts';

export type LensControls = {
  add: (lens: Lens) => void;
  remove: () => void;
  activeId: () => string | undefined;
};

export const createLensState = (
  componentSlots: Pick<ComponentSlotControls, 'set'>,
): LensControls => {
  let activeLens: Lens | undefined;

  const removeLens = () => {
    activeLens?.teardown();
    componentSlots.set([]);
    activeLens = undefined;
  };

  const addLens = (lens: Lens) => {
    if (activeLens) removeLens();
    lens.setup();
    componentSlots.set(lens.components ?? []);
    activeLens = lens;
  };

  const activeLensId = () => activeLens?.id;

  return {
    add: addLens,
    remove: removeLens,
    activeId: activeLensId,
  };
};
