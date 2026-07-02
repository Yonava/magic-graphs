import { CanvasGraphMouseEvent } from '../canvas/events.ts';
import { InteractivePlugin } from './types.ts';

/**
 * interactive allows users to create, edit and delete nodes and edges
 */
export const interactive: InteractivePlugin = ({
  controls,
  actions,
  events,
  getters,
}) => {
  let lastClickTime = 0;

  const handleNodeCreation = ({ coords, elements }: CanvasGraphMouseEvent) => {
    const ABOUT_A_FEW_HUNDRED_MS = 350;
    const timeDiff = Date.now() - lastClickTime;
    const closeEnoughInTime = timeDiff < ABOUT_A_FEW_HUNDRED_MS;
    if (!closeEnoughInTime) return (lastClickTime = Date.now());
    lastClickTime = 0;

    const topElement = elements.at(-1);
    if (topElement && controls.isNode(topElement.id)) return;

    actions.addNode({ x: coords.x, y: coords.y });
  };

  const doesEdgeConformToRules = (
    sourceNode: { id: string },
    targetNode: { id: string },
  ) => {
    if (controls.settings.userAddedEdgeRuleNoSelfLoops) {
      const violatesRule = sourceNode.id === targetNode.id;
      if (violatesRule) return false;
    }

    if (controls.settings.userAddedEdgeRuleOneEdgePerPath) {
      const edgeBetweenToAndFrom = controls.edges.value.find(
        (edge) =>
          edge.source === sourceNode.id && edge.target === targetNode.id,
      );

      const edgeBetweenFromAndTo = controls.edges.value.find(
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
    });
  };

  const enable = () => {
    events.subscribe('onClick', handleNodeCreation);
    events.subscribe('onNodeAnchorDrop', handleEdgeCreation);
  };

  const disable = () => {
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
