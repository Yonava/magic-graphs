import type { MARKUP_SIZES } from './constants';

/**
 * a union of all possible sizes for nodes and edges in the markup menu
 */
export type MarkupSize = (typeof MARKUP_SIZES)[number];
