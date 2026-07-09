import type { Prettify } from 'ts-essentials';

import type { EllipseSchema } from '../ellipse/types.ts';

export type CircleSchema = Prettify<
  Omit<EllipseSchema, 'radiusX' | 'radiusY'> & {
    radius: number;
  }
>;
