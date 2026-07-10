import { useGraph } from './useGraph.ts';

export type Graph = ReturnType<typeof useGraph>;

export type GNode = ReturnType<Graph['getNode']>;
export type GEdge = ReturnType<Graph['getEdge']>;

export type ThemePreset = ReturnType<Graph['theme']['activePresetName']>;
