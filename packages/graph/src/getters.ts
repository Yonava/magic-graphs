import { CoreEdge, CoreNode } from '@magic/graph-core-infra/types';
import { Fraction } from 'mathjs';

export type CoreGetters = {
  getNode: CoreNode;
  getEdge: CoreEdge & { weight: Fraction };
};
