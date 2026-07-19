import { nullThrows } from '@core/utils/assert';
import { getCtx } from '@core/utils/ctx/index';
import { getValue } from '@core/utils/maybeGetter/index';
import Fraction from 'fraction.js';

import { CanvasGraphMouseEvent } from '../canvas/events.ts';
import { INTERACTIVE_PLUGIN_ID } from './constants.ts';
import { DEFAULT_INTERACTIVE_OPTIONS, InteractiveOptions } from './options.ts';
import { InteractivePlugin } from './types.ts';

/**
 * interactive allows users to create, edit and delete nodes and edges
 */
export const interactive =
  (options: Partial<InteractiveOptions>): InteractivePlugin =>
  ({ controls, actions, finalActions, getters }) => {
    const optionsWithDefaults = {
      ...DEFAULT_INTERACTIVE_OPTIONS,
      ...options,
    };

    let lastClickTime = 0;

    const handleNodeCreation = ({
      coords,
      elements,
    }: CanvasGraphMouseEvent) => {
      const ABOUT_A_FEW_HUNDRED_MS = 350;
      const timeDiff = Date.now() - lastClickTime;
      const closeEnoughInTime = timeDiff < ABOUT_A_FEW_HUNDRED_MS;
      if (!closeEnoughInTime) return (lastClickTime = Date.now());
      lastClickTime = 0;

      const topElement = elements.at(-1);
      if (topElement && controls.isNode(topElement.id)) return;

      // finalActions, not actions: this fires later, on a real click, so it
      // needs the fully-composed action, not the fold-time snapshot
      finalActions.addNode({ position: { x: coords.x, y: coords.y } });
    };

    const handleEdgeTextArea = ({
      elements,
      coords,
    }: CanvasGraphMouseEvent) => {
      const topElement = elements.at(-1);
      if (
        !topElement ||
        !topElement.shape.textHitbox?.(coords) ||
        !controls.isEdge(topElement.id)
      ) {
        return;
      }

      const ctx = getCtx(controls.canvas.magicCanvas.canvas);

      topElement.shape.startTextAreaEdit?.(ctx, (textAreaContent) => {
        const edge = nullThrows(
          getters.getEdge(topElement.id),
          'Edge not found!',
        );

        const newWeight =
          optionsWithDefaults.edgeInputToWeight(textAreaContent);
        if (
          newWeight === undefined ||
          edge.weight.valueOf() === newWeight.valueOf()
        ) {
          return;
        }

        controls.weights.set({ edgeId: edge.id, update: newWeight });
      });
    };

    const doesEdgeConformToRules = (
      sourceNode: { id: string },
      targetNode: { id: string },
    ) => {
      if (options.addedEdgeRuleNoSelfLoops) {
        const violatesRule = sourceNode.id === targetNode.id;
        if (violatesRule) return false;
      }

      if (options.addedEdgeRuleOneEdgePerPath) {
        const edgeBetweenToAndFrom = controls.edges.find(
          (edge) =>
            edge.source === sourceNode.id && edge.target === targetNode.id,
        );

        const edgeBetweenFromAndTo = controls.edges.find(
          (edge) =>
            edge.source === targetNode.id && edge.target === sourceNode.id,
        );

        const violatesRule = edgeBetweenToAndFrom || edgeBetweenFromAndTo;
        if (violatesRule) return false;
      }

      return true;
    };

    const handleEdgeCreation = (sourceNode: { id: string }) => {
      const { elements } = controls.canvas.graphUnderCursor;

      const nodeUnderneathAnchor = elements.findLast((el) =>
        controls.isNode(el.id),
      );
      if (!nodeUnderneathAnchor) return;

      const targetNode = getters.getNode(nodeUnderneathAnchor.id);
      if (!targetNode) return;

      const canCreateEdge = doesEdgeConformToRules(sourceNode, targetNode);
      if (!canCreateEdge) return;

      const numberWeight = getValue(
        optionsWithDefaults.addedEdgeWeight,
      ).valueOf();

      // finalActions, not actions: this fires later, on anchor drop, so it
      // needs the fully-composed action, not the fold-time snapshot
      finalActions.addEdge({
        source: sourceNode.id,
        target: targetNode.id,
        weight: new Fraction(numberWeight),
      });
    };

    const enable = () => {
      controls.canvas.events.subscribe('onMouseDown', handleEdgeTextArea);
      controls.canvas.events.handle(
        'onClick',
        handleNodeCreation,
        INTERACTIVE_PLUGIN_ID,
      );
      controls.anchors?.events.subscribe('onNodeAnchorDrop', handleEdgeCreation);
    };

    const disable = () => {
      controls.canvas.events.unsubscribe('onMouseDown', handleEdgeTextArea);
      controls.canvas.events.unhandle('onClick', handleNodeCreation);
      controls.anchors?.events.unsubscribe(
        'onNodeAnchorDrop',
        handleEdgeCreation,
      );
    };

    enable();

    return {
      name: 'interactive',
      actions,
      getters,
      controls: {
        lifecycle: {
          enable,
          disable,
        },
      },
    };
  };
