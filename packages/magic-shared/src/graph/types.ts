import { AdjacencyListsPlugin } from '@graph/plugins/adjacency-lists/types';
import { AnchorsPlugin } from '@graph/plugins/anchors/types';
import { CanvasPlugin } from '@graph/plugins/canvas/types';
import { CharacteristicsPlugin } from '@graph/plugins/characteristics/index';
import { FocusPlugin } from '@graph/plugins/focus/types';
import { HistoryPlugin } from '@graph/plugins/history/types';
import { InteractivePlugin } from '@graph/plugins/interactive/types';
import { MarqueePlugin } from '@graph/plugins/marquee/types';
import { NodeDragPlugin } from '@graph/plugins/node-drag/types';
import { NodeLabelPlugin } from '@graph/plugins/node-label/types';
import { TransitionMatrixPlugin } from '@graph/plugins/transition-matrix/types';

import { UnwrapRef } from 'vue';

import { useGraph } from './useGraph.ts';

export type Graph = ReturnType<typeof useGraph>;

export type GNode = ReturnType<Graph['getNode']>;
export type GEdge = ReturnType<Graph['getEdge']>;

export type AddGNodeOptions = Parameters<Graph['actions']['addNode']>[0];
export type AddGEdgeOptions = Parameters<Graph['actions']['addEdge']>[0];

export type GraphEncode = ReturnType<Graph['transit']['encode']>;

export type ThemePreset = UnwrapRef<Graph['theme']['activePresetName']>;
