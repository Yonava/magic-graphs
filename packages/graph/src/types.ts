import { Fraction } from 'mathjs';

export type { RemovableRef } from '@vueuse/core';
export type {
  DeepRequired,
  Prettify,
  UnionToIntersection,
} from 'ts-essentials';

/**
 * a node in a graph instance
 */
export type GNode = {
  /**
   * unique identifier for the node
   */
  id: string;
};

/**
 * an edge in a graph instance
 */
export type GEdge = {
  /**
   * unique identifier for the edge
   */
  id: string;
  /**
   * {@link GNode.id | id} of the node that the edge is pointing towards
   */
  target: string;
  /**
   * {@link GNode.id | id} of the node that the edge is coming from
   */
  source: string;
  /**
   * the weight of the edge
   * @default new Fraction(1)
   */
  weight: Fraction;
};

export type GraphPlugin<PluginInterface extends Record<string, unknown>> =
  PluginInterface & {
    /**
     * enable plugin
     */
    activate: () => void;
    /**
     * disable plugin
     */
    deactivate: () => void;
  };
