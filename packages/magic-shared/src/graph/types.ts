import { UnwrapRef } from 'vue';

import { useGraph } from './useGraph.ts';

// interface as opposed to type alias to get cleaner hoverable type
export interface Graph extends ReturnType<typeof useGraph> {}

export type GNode = ReturnType<Graph['getNode']>;
export type GEdge = ReturnType<Graph['getEdge']>;

export type AddGNodeOptions = Parameters<Graph['actions']['addNode']>[0];
export type AddGEdgeOptions = Parameters<Graph['actions']['addEdge']>[0];

export type GraphEncode = ReturnType<Graph['transit']['encode']>;

export type ThemePreset = UnwrapRef<Graph['theme']['activePresetName']>;
