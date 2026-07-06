import { CoreEdge, CoreNode } from '@magic/graph-primitives/types';
import Fraction from 'fraction.js';

export type CoreGetters = {
  getNode: CoreNode;
  getEdge: CoreEdge & { weight: Fraction };
};
