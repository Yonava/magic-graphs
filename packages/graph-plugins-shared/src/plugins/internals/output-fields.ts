import { CoreActions } from '@graph/core/actions/types';
import { CoreGetters } from '@graph/core/getters';
import {
  GraphActions,
  MergeActions,
  PartialBaseActions,
} from '@graph/primitives/actions/types';
import {
  BaseGetters,
  GraphGetters,
  MergeGetters,
} from '@graph/primitives/getters/types';
import { TransitControls } from '@graph/primitives/transit/types';
import { IsNever } from 'ts-essentials';

// a plugin that declares no controls, getters, actions or transit in its schema has
// nothing of its own to hand back, so the field drops off its output rather than making
// it pass through what it was handed. undeclared schema fields resolve to never (see
// ./defaults.ts), which is what each of these keys off

export type ControlsField<Controls> =
  IsNever<Controls> extends true
    ? {}
    : {
        controls: Controls;
      };

export type GettersField<Getters extends Partial<BaseGetters>> =
  IsNever<Getters> extends true
    ? {}
    : {
        getters: GraphGetters<MergeGetters<[Getters, CoreGetters]>>;
      };

export type ActionsField<Actions extends PartialBaseActions> =
  IsNever<Actions> extends true
    ? {}
    : {
        actions: GraphActions<MergeActions<[Actions, CoreActions]>>;
      };

export type TransitField<PayloadData> =
  IsNever<PayloadData> extends true
    ? {}
    : {
        transit: TransitControls<PayloadData>;
      };
