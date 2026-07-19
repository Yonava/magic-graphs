import { MOUSE_BUTTONS } from '@core/utils/mouse';
import { createThemeController } from '@graph/plugins-shared/theme';
import { createEventHub } from '@graph/primitives/events/createEventHub';
import { ElementRemovalPayload } from '@graph/primitives/transactions/types';
import { DeepReadonly } from 'ts-essentials';

import { CanvasGraphMouseEvent } from '../canvas/events.ts';
import { NODE_DRAG_PLUGIN_ID } from '../node-drag/constants.ts';
import { FOCUS_PLUGIN_ID } from './constants.ts';
import { createFocusEventRegistry } from './events.ts';
import { createFocusDetectors, createFocusThemeOverrides } from './themes.ts';
import { FocusPlugin } from './types.ts';

export const focus: FocusPlugin = ({ controls, events, actions, getters }) => {
  const focusEventRegistry = createFocusEventRegistry();
  const focusEventHub = createEventHub(focusEventRegistry);

  let focusedElementIds = new Set<string>();

  const setFocus = (ids: string[]) => {
    const elementsAlreadyFocused =
      ids.length === focusedElementIds.size &&
      ids.every((id) => focusedElementIds.has(id));
    if (ids.length > 0 && elementsAlreadyFocused) return;

    const oldIds = new Set([...focusedElementIds]);
    focusedElementIds = new Set(ids);

    focusEventHub.emit('onFocusChange', focusedElementIds, oldIds);
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
        `Attempted to focus non-existent elements`,
        nonExistingElementIds,
      );
    }
    const stagedElementIds = elementsAddedToFocus.filter(
      (newId) =>
        !focusedElementIds.has(newId) && !nonExistingElementIds.has(newId),
    );
    if (stagedElementIds.length === 0) return;

    const previousFocusedElementIds = new Set([...focusedElementIds]);
    const newFocusedElementIds = new Set([
      ...stagedElementIds,
      ...previousFocusedElementIds,
    ]);
    focusedElementIds = newFocusedElementIds;
    focusEventHub.emit(
      'onFocusChange',
      newFocusedElementIds,
      previousFocusedElementIds,
    );
  };

  const clearRemovedElementsFromFocus = ({
    removedNodeIds,
    removedEdgeIds,
  }: DeepReadonly<ElementRemovalPayload>) => {
    const hasRemovedFocus =
      removedNodeIds.some(isFocused) || removedEdgeIds.some(isFocused);

    if (!hasRemovedFocus) return;

    const removedIds = new Set<string>([...removedNodeIds, ...removedEdgeIds]);

    const newFocusedIds = Array.from(focusedElementIds).filter(
      (id) => !removedIds.has(id),
    );

    setFocus(newFocusedIds);
  };

  const handleMouseDown = ({
    elements: items,
    event,
  }: CanvasGraphMouseEvent) => {
    if (event.button !== MOUSE_BUTTONS.left) return;
    const topItem = items.at(-1);
    if (!topItem) {
      return event.shiftKey ? undefined : clearFocus();
    }

    if (event.shiftKey) addToFocus(topItem.id);
    else setFocus([topItem.id]);
  };

  const focusAll = () => {
    const nodeIds = controls.nodes.map((node) => node.id);
    const edgeIds = controls.edges.map((edge) => edge.id);
    setFocus([...nodeIds, ...edgeIds]);
  };

  const isFocused = (id: string) => focusedElementIds.has(id);

  const enable = () => {
    // focus a node when clicked, or clear focus if background is clicked
    controls.canvas.events.handle(
      'onMouseDown',
      handleMouseDown,
      FOCUS_PLUGIN_ID,
      {
        before: [NODE_DRAG_PLUGIN_ID],
      },
    );

    // clean up the focus so removed elements aren't in the state
    events.subscribe('onElementsRemoved', clearRemovedElementsFromFocus);
  };

  const disable = () => {
    controls.canvas.events.unhandle('onMouseDown', handleMouseDown);

    events.unsubscribe('onElementsRemoved', clearRemovedElementsFromFocus);
    clearFocus();
  };

  enable();

  const extendedActions: ReturnType<FocusPlugin>['actions'] = {
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
    removeNode: (options) => {
      const removedNode = actions.removeNode(options);
      clearRemovedElementsFromFocus({
        removedNodeIds: removedNode.removedNodeIds,
        removedEdgeIds: removedNode.removedEdgeIds,
      });
      return removedNode;
    },
    removeEdge: (options) => {
      const removedEdgeId = actions.removeEdge(options);
      clearRemovedElementsFromFocus({
        removedNodeIds: [],
        removedEdgeIds: [removedEdgeId],
      });
      return removedEdgeId;
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
    removeElements: (options, shared) => {
      const removedElements = actions.removeElements(options, shared);
      clearRemovedElementsFromFocus({
        removedNodeIds: removedElements.removedNodeIds,
        removedEdgeIds: removedElements.removedEdgeIds,
      });
      return removedElements;
    },
  };

  const theme = createThemeController(createFocusThemeOverrides());

  return {
    name: 'focus',
    actions: extendedActions,
    getters,
    controls: {
      set: setFocus,
      clear: clearFocus,
      add: addToFocus,
      all: focusAll,
      isFocused,
      focusedNodes: () => controls.nodes.filter((node) => isFocused(node.id)),
      focusedEdges: () => controls.edges.filter((edge) => isFocused(edge.id)),
      events: focusEventHub,
      theme: {
        ...theme,
        detectors: createFocusDetectors(isFocused, theme._resolveToken),
      },
      lifecycle: {
        enable,
        disable,
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
