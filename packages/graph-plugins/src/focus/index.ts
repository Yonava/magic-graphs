import { createEventHub } from '@magic/graph-core-infra/events/createEventHub';
import { mergeEventHubs } from '@magic/graph-core-infra/events/mergeEventHubs';
import { ElementRemovalPayload } from '@magic/graph-core-infra/transactions/types';
import { createThemeController } from '@magic/graph-plugins-shared/theme/createThemeController';
import { CoreEventMap } from '@magic/graph/core/events';
import { nullThrows } from '@magic/utils/assert';
import { getCtx } from '@magic/utils/ctx/index';
import { MOUSE_BUTTONS } from '@magic/utils/mouse';
import { DeepReadonly } from 'ts-essentials';

import { computed, readonly, ref } from 'vue';

import { CanvasElement } from '../canvas/aggregator/types.ts';
import { CanvasEventMap, CanvasGraphMouseEvent } from '../canvas/events.ts';
import { NODE_DRAG_PLUGIN_ID } from '../node-drag/constants.ts';
import { FOCUSABLE_GRAPH_TYPES, FOCUS_PLUGIN_ID } from './constants.ts';
import { FocusEventMap, createFocusEventRegistry } from './events.ts';
import { createFocusDetectors, createFocusThemeOverrides } from './themes.ts';
import { FocusPlugin } from './types.ts';

export const focus: FocusPlugin = ({
  controls,
  events: graphEventHub,
  actions,
  getters,
}) => {
  const focusEventRegistry = createFocusEventRegistry();
  const focusEventHub = createEventHub(focusEventRegistry);
  const events = mergeEventHubs<FocusEventMap, CoreEventMap & CanvasEventMap>(
    focusEventHub,
    graphEventHub,
  );

  const focusedElementIds = ref(new Set<string>());

  const setFocus = (ids: string[]) => {
    const elementsAlreadyFocused = ids.every((id) =>
      focusedElementIds.value.has(id),
    );
    if (ids.length > 0 && elementsAlreadyFocused) return;

    const oldIds = new Set([...focusedElementIds.value]);
    focusedElementIds.value = new Set(ids);

    events.emit('onFocusChange', focusedElementIds.value, oldIds);
  };

  const clearFocus = () => setFocus([]);

  const addToFocus = (id: string | Readonly<string[]>) => {
    const elementsAddedToFocus = typeof id === 'object' ? id : [id];
    const nonExistingElementIds = new Set(
      elementsAddedToFocus.filter(
        (newId) => !getters.getNode(newId) && !getters.getEdge(newId),
      ),
    );
    if (nonExistingElementIds.size) {
      console.warn(
        `Attempted to focus non-existent items`,
        nonExistingElementIds,
      );
    }
    const stagedElementIds = elementsAddedToFocus.filter(
      (newId) =>
        !focusedElementIds.value.has(newId) &&
        !nonExistingElementIds.has(newId),
    );
    if (stagedElementIds.length === 0) return;

    const previousFocusedElementIds = new Set([...focusedElementIds.value]);
    const newFocusedElementIds = new Set([
      ...stagedElementIds,
      ...previousFocusedElementIds,
    ]);
    focusedElementIds.value = newFocusedElementIds;
    events.emit(
      'onFocusChange',
      newFocusedElementIds,
      previousFocusedElementIds,
    );
  };

  const handleTextArea = (canvasElement: CanvasElement) => {
    const ctx = getCtx(controls.canvas.magicCanvas.canvas);

    canvasElement.shape.startTextAreaEdit?.(ctx, (textAreaContent) => {
      const edge = nullThrows(
        getters.getEdge(canvasElement.id),
        `Only edges may include TextAreas: Got ${canvasElement.graphType}`,
      );

      const newWeight =
        controls.settings.value.edgeInputToWeight(textAreaContent);
      if (
        newWeight === undefined ||
        edge.weight.valueOf() === newWeight.valueOf()
      ) {
        return;
      }

      controls.weights.set({ edgeId: edge.id, update: newWeight });
    });
  };

  const clearRemovedElementsFromFocus = ({
    removedNodeIds,
    removedEdgeIds,
  }: DeepReadonly<ElementRemovalPayload>) => {
    const hasRemovedFocus =
      removedNodeIds.some(isFocused) || removedEdgeIds.some(isFocused);

    if (!hasRemovedFocus) return;

    const removedIds = new Set<string>([...removedNodeIds, ...removedEdgeIds]);

    const newFocusedIds = Array.from(focusedElementIds.value).filter(
      (id) => !removedIds.has(id),
    );

    setFocus(newFocusedIds);
  };

  const handleMouseDown = ({
    elements: items,
    coords,
    event,
  }: CanvasGraphMouseEvent) => {
    if (event.button !== MOUSE_BUTTONS.left) return;
    const topItem = items.at(-1);
    if (!topItem) {
      return event.shiftKey ? undefined : clearFocus();
    }

    // handle text areas
    const inATextArea = topItem.shape.textHitbox?.(coords);
    const canEdit =
      inATextArea &&
      controls.settings.value.edgeLabelsEditable &&
      topItem.graphType === 'edge';

    if (canEdit) {
      clearFocus();
      return handleTextArea(topItem);
    }

    const canFocus = FOCUSABLE_GRAPH_TYPES.some(
      (type) => type === topItem.graphType,
    );
    if (!canFocus) return;

    if (event.shiftKey) addToFocus(topItem.id);
    else setFocus([topItem.id]);
  };

  const focusAll = () => {
    const nodeIds = controls.nodes.value.map((node) => node.id);
    const edgeIds = controls.edges.value.map((edge) => edge.id);
    setFocus([...nodeIds, ...edgeIds]);
  };

  const isFocused = (id: string) => focusedElementIds.value.has(id);

  const enable = () => {
    // focus a node when clicked, or clear focus if background is clicked
    events.handle('onMouseDown', handleMouseDown, FOCUS_PLUGIN_ID, {
      before: [NODE_DRAG_PLUGIN_ID],
    });

    // clean up the focus so removed elements aren't in the state
    events.subscribe('onElementsRemoved', clearRemovedElementsFromFocus);
  };

  const disable = () => {
    events.unhandle('onMouseDown', handleMouseDown);

    events.unsubscribe('onElementsRemoved', clearRemovedElementsFromFocus);
    clearFocus();
  };

  enable();

  const extendedActions: ReturnType<FocusPlugin>['actions'] = {
    ...actions,
    addNode: (options) => {
      const addedNode = actions.addNode(options);
      const focusOnAdded = options?.focus ?? true;
      if (focusOnAdded) setFocus([addedNode.id]);
      return addedNode;
    },
    addEdge: (options) => {
      const addedEdge = actions.addEdge(options);
      const focusOnAdded = options?.focus ?? true;
      if (focusOnAdded) setFocus([addedEdge.id]);
      return addedEdge;
    },
    addElements: (options, shared) => {
      const updatedElements = actions.addElements(options, shared);
      const focusOnAdded = shared?.focus ?? true;
      if (focusOnAdded) {
        setFocus([
          ...updatedElements.addedNodes.map((n) => n.id),
          ...updatedElements.addedEdges.map((e) => e.id),
        ]);
      }
      return updatedElements;
    },
  };

  const theme = createThemeController(createFocusThemeOverrides());

  return {
    events,
    actions: extendedActions,
    getters,
    controls: {
      focus: {
        set: setFocus,
        clear: clearFocus,
        add: addToFocus,
        all: focusAll,
        isFocused,
        focusedElementIds: readonly(focusedElementIds),
        focusedNodes: computed(() =>
          controls.nodes.value.filter((node) => isFocused(node.id)),
        ),
        focusedEdges: computed(() =>
          controls.edges.value.filter((edge) => isFocused(edge.id)),
        ),
        theme: {
          ...theme,
          detectors: createFocusDetectors(isFocused, theme._resolveToken),
        },
        lifecycle: {
          enable,
          disable,
        },
      },
    },
    onAfterInit: () => {
      const weightLayer = theme.createLayer(
        FOCUS_PLUGIN_ID + '/theme/edge-weight',
      );
      weightLayer.set('edge.focus.text.content', (edge) =>
        getters.getEdge(edge.id).weight.toFraction(),
      );
    },
  };
};
