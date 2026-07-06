import { nullThrows } from '@magic/utils/assert';
import { getCtx } from '@magic/utils/ctx/index';

import { CanvasElement } from '../canvas/aggregator/types.ts';
import { CanvasGraphMouseEvent } from '../canvas/events.ts';
import { DEFAULT_INTERACTIVE_OPTIONS, InteractiveOptions } from './options.ts';
import { InteractivePlugin } from './types.ts';

/**
 * interactive allows users to create, edit and delete nodes and edges
 */
export const interactive =
  (options: Partial<InteractiveOptions>): InteractivePlugin =>
  ({ controls, actions, events, getters }) => {
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

      actions.addNode({ x: coords.x, y: coords.y });
    };

    const handleEdgeTextArea = ({ elements }: CanvasGraphMouseEvent) => {
      const topElement = elements.at(-1);
      if (!topElement || !controls.isEdge(topElement.id)) return;

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

      actions.addEdge({
        source: sourceNode.id,
        target: targetNode.id,
        weight: optionsWithDefaults.addedEdgeWeight(),
      });
    };

    const enable = () => {
      events.subscribe('onMouseDown', handleEdgeTextArea);
      events.subscribe('onClick', handleNodeCreation);
      events.subscribe('onNodeAnchorDrop', handleEdgeCreation);
    };

    const disable = () => {
      events.unsubscribe('onMouseDown', handleEdgeTextArea);
      events.unsubscribe('onClick', handleNodeCreation);
      events.unsubscribe('onNodeAnchorDrop', handleEdgeCreation);
    };

    enable();

    return {
      name: 'interactive',
      actions,
      events,
      getters,
      controls: {
        lifecycle: {
          enable,
          disable,
        },
      },
    };
  };
