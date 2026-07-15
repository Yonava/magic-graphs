import { TransitControls } from '@graph/primitives/transit/types';
import { IsNever } from 'ts-essentials';

export type TransitField<PayloadData> =
  IsNever<PayloadData> extends true
    ? {}
    : {
        transit: TransitControls<PayloadData>;
      };
