import { CoreEdge, CoreNode } from '@graph/primitives/types';
import Fraction from 'fraction.js';

export type CoreGetters = {
  getNode: CoreNode;
  getEdge: CoreEdge & { weight: Fraction };
};
