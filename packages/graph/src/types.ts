import { Fraction } from 'mathjs';

export type { RemovableRef } from '@vueuse/core';
export type {
  DeepRequired,
  Prettify,
  UnionToIntersection,
} from 'ts-essentials';

export type CoreNode = {
  /**
   * unique identifier for the node
   */
  id: string;
};

export type CodeEdge = {
  /**
   * unique identifier for the edge
   */
  id: string;
  /**
   * {@link CoreNode.id | id} of the node that the edge is pointing towards
   */
  target: string;
  /**
   * {@link CoreNode.id | id} of the node that the edge is coming from
   */
  source: string;
  /**
   * the weight of the edge
   * @default new Fraction(1)
   */
  weight: Fraction;
};
