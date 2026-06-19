import { nullThrows } from '@magic/utils/assert';
import { getValue } from '@magic/utils/maybeGetter/index';
import { Fraction } from 'mathjs';

import { Ref } from 'vue';

import { EventHub } from '../../events/createEventHub.ts';
import type { GraphSettings } from '../../settings/index.ts';
import { CoreEventMap } from '../events.ts';
import { DEFAULT_WEIGHT } from './constants.ts';
import { EdgeWeightStoreControls } from './types.ts';

export const createEdgeWeightStore = (
  events: EventHub<CoreEventMap>,
  settings: Ref<GraphSettings>,
): EdgeWeightStoreControls => {
  const edgeIdToEdgeWeight = new Map<string, Fraction>();

  const getEdgeWeight: EdgeWeightStoreControls['get'] = (edgeId) => {
    nullThrows(
      edgeIdToEdgeWeight.get(edgeId),
      `could not resolve weight from edge with id ${edgeId}`,
    );
    return settings.value.isGraphWeighted
      ? edgeIdToEdgeWeight.get(edgeId)!
      : new Fraction(1);
  };

  const setEdgeWeights: EdgeWeightStoreControls['setMany'] = (updates) => {
    return updates.map(({ edgeId, update }) => {
      const currentWeight = getEdgeWeight(edgeId);
      const weight = getValue(update, currentWeight);
      edgeIdToEdgeWeight.set(edgeId, weight);
      return { edgeId, weight };
    });
  };

  return {
    get: getEdgeWeight,
    set: (update) => {
      const [entry] = setEdgeWeights([update]);
      events.emit('onEdgeWeightsCommitted', [entry]);
      events.emit('onStructureChange');
      return entry;
    },
    setMany: (updates) => {
      const entries = setEdgeWeights(updates);
      events.emit('onEdgeWeightsCommitted', entries);
      events.emit('onStructureChange');
      return entries;
    },
    _internal: {
      edgeIdToEdgeWeight,
      add: (edges) => {
        for (const { id, weight } of edges) {
          edgeIdToEdgeWeight.set(id, weight ?? DEFAULT_WEIGHT);
        }
      },
      remove: (edgeIds) => {
        for (const id of edgeIds) {
          edgeIdToEdgeWeight.delete(id);
        }
      },
    },
  };
};
