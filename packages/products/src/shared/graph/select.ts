import { CanvasElement } from '@magic/graph-plugins/canvas/aggregator/types';
import { CanvasGraphMouseEvent } from '@magic/graph-plugins/canvas/events';
import tinycolor from 'tinycolor2';

import type { Graph } from '../useGraphWithCanvas.ts';
import { useSelectCursor } from './useSelectCursor.ts';

const animateNodePulse = (graph: Graph) =>
  graph.canvas.shapes.defineTimeline({
    forShapes: ['circle'],
    durationMs: 2000,
    keyframes: [
      {
        progress: 0.4,
        properties: {
          radius: (r) => r,
          fillColor: (c) => c,
        },
      },
      {
        progress: 0.5,
        properties: {
          radius: {
            value: (r) => r + 5,
            easing: 'out',
          },
          fillColor: (c) => tinycolor(c).darken(5).toRgbString(),
        },
      },
      {
        progress: 0.8,
        properties: {
          radius: {
            value: (r) => r,
            easing: 'in',
          },
          fillColor: (c) => c,
        },
      },
    ],
  });

/**
 * selects canvas elements only of graph type 'node'
 *
 * @param graph the graph to select from
 * @returns a promise that resolves to the selected node or
 * undefined if the selection was cancelled
 */
export const selectNode = (graph: Graph) => {
  const { selectedItemPromise, cancelSelection } = selectFromGraph(graph, {
    isCanvasElementSelectable: (el) => graph.isNode(el.id),
  });

  const pulse = animateNodePulse(graph);

  for (const node of graph.nodes.value) pulse.play({ shapeId: node.id });

  return {
    selectedItemPromise: async () => {
      const selectedItem = await selectedItemPromise;
      for (const node of graph.nodes.value) pulse.stop({ shapeId: node.id });
      pulse.dispose();
      return selectedItem ? graph.getNode(selectedItem.id) : undefined;
    },
    cancelSelection,
  };
};

/**
 * selects canvas elements only of graph type 'edge'
 *
 * @param graph the graph to select from
 * @returns a promise that resolves to the selected edge or
 * undefined if the selection was cancelled
 */
export const selectEdge = (graph: Graph) => {
  const { selectedItemPromise, cancelSelection } = selectFromGraph(graph, {
    isCanvasElementSelectable: (el) => graph.isEdge(el.id),
  });

  return {
    selectedItemPromise: async () => {
      const selectedItem = await selectedItemPromise;
      return selectedItem ? graph.getEdge(selectedItem.id) : undefined;
    },
    cancelSelection,
  };
};

export type SelectFromGraphOptions = {
  /**
   * only items that satisfy this predicate will be selectable.
   * if left undefined, all items in the graph will be selectable
   * @default () => true
   */
  isCanvasElementSelectable: (item: CanvasElement) => boolean;
};

/**
 * waits for the user to click on an item in the graph and resolves to the selected item
 * or undefined if the cancel handler is invoked
 *
 * @param graph the graph to select from
 * @param options options for the selection process
 * @returns a promise that resolves to the selected item or undefined if the selection was cancelled
 * @example const { selectedItemPromise, cancelSelection } = selectFromGraph(graph);
 * const selectedItem = await selectedItemPromise;
 * if (!selectedItem) return; // selection was cancelled
 * // selection resolved. do something with the selected item
 */
export const selectFromGraph = (
  graph: Graph,
  {
    isCanvasElementSelectable = () => true,
  }: Partial<SelectFromGraphOptions> = {},
) => {
  let resolver: (
    value: CanvasElement | PromiseLike<CanvasElement> | undefined,
  ) => void;

  const selectedItemPromise = new Promise<CanvasElement | undefined>(
    (res) => (resolver = res),
  );

  const cursorTheme = useSelectCursor(graph, isCanvasElementSelectable);

  const onClick = ({ elements }: CanvasGraphMouseEvent) => {
    const topElement = elements.at(-1);
    if (!topElement || !isCanvasElementSelectable(topElement)) return;
    resolve(topElement);
  };

  /**
   * initializes the selection process
   */
  const init = () => {
    graph.events.subscribe('onClick', onClick);
    // TODO disable interactivity (node anchors, drag, marquee etc) when interactivity product-land plugin lands
    // https://github.com/Yonava/magic-graphs/issues/659
    cursorTheme.activate();
  };

  /**
   * cleans up the selection process
   */
  const cleanup = () => {
    graph.events.unsubscribe('onClick', onClick);
    // TODO disable interactivity (node anchors, drag, marquee etc) when interactivity product-land plugin lands
    // https://github.com/Yonava/magic-graphs/issues/659
    cursorTheme.deactivate();
  };

  /**
   * resolves the selection process and returns the selected item from the promise
   */
  const resolve = (item: CanvasElement) => {
    cleanup();
    resolver(item);
  };

  /**
   * cancels the selection process and returns undefined from the promise (public)
   */
  const cancelSelection = () => {
    cleanup();
    resolver(undefined);
  };

  init();

  return {
    /**
     * resolves to user selected item or undefined if cancelled
     */
    selectedItemPromise,
    cancelSelection,
  };
};

export type SelectControls = ReturnType<typeof selectFromGraph>;
