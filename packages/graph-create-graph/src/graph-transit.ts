import { core } from '@graph/core/index';
import { GraphTransit } from '@graph/primitives/transit/types';

import {
  ConsumerEventHub,
  TransitEventHub,
  emitConsumerEvents,
} from './consumer-events.ts';

type PluginTransitControl = {
  pluginName: string;
  transit: {
    encode: () => any;
    decode: (data: any) => void;
    validate: (data: any) => boolean;
  };
};

type CreateGraphTransitOptions = {
  pluginTransitControls: PluginTransitControl[];
  coreGraph: ReturnType<typeof core>;
  consumerEvents: ConsumerEventHub;
  transitEvents: TransitEventHub;
};

/**
 * assembles the graph wide encode/decode surface out of every plugin's own transit
 * controls, keyed by plugin name. each plugin is the only thing that knows how to
 * serialize the state it owns, so this never needs to know what any of that state is.
 */
export const createGraphTransit = <PayloadData>({
  pluginTransitControls,
  coreGraph,
  consumerEvents,
  transitEvents,
}: CreateGraphTransitOptions): GraphTransit<PayloadData> => ({
  encode: () => {
    const payload = pluginTransitControls.reduce(
      (result, { pluginName, transit }) => ({
        ...result,
        [pluginName]: transit.encode(),
      }),
      {} as PayloadData,
    );

    transitEvents.emit('onEncoded', payload as Record<string, unknown>);

    return payload;
  },
  decode: (payload) => {
    // the payload is keyed by plugin name, which is only knowable at runtime here.
    // the caller supplies the precise shape via PayloadData.
    const data = payload as Record<string, any>;

    const pluginsFailingValidation = pluginTransitControls.filter(
      ({ pluginName, transit }) => !transit.validate(data[pluginName]),
    );
    if (pluginsFailingValidation.length > 0) {
      const namesOfFailures = pluginsFailingValidation
        .map((p) => p.pluginName)
        .join(', ');
      throw new Error(`Data decode validation failed for: ${namesOfFailures}`);
    }
    const oldNodeIds = coreGraph.controls.nodes().map((n) => n.id);
    const oldEdgeIds = coreGraph.controls.edges().map((e) => e.id);
    for (const { pluginName, transit } of pluginTransitControls) {
      transit.decode(data[pluginName]);
    }

    emitConsumerEvents(
      {
        addedEdges: data.core.edges,
        addedNodes: data.core.nodes,
        removedEdgeIds: oldEdgeIds,
        removedNodeIds: oldNodeIds,
      },
      consumerEvents.emit,
    );

    // after the consumer events above on purpose — anything listening for onDecoded
    // sees a graph that has already settled into its new structure.
    transitEvents.emit('onDecoded', data);
  },
});
