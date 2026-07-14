import { MaybeGetter } from '@core/utils/maybeGetter/index';

import { Lens } from '../../lens/types.ts';

export type LensChipDefinition = {
  title: MaybeGetter<string>;
  tooltipContent: MaybeGetter<string>;
  lens: Lens;
};
