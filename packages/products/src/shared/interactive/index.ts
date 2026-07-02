import { CanvasGraphMouseEvent } from '@magic/graph-plugins/canvas/events';

import { GraphWithPlugins } from '../useGraph.ts';

/**
 * interactive allows users to create, edit and delete nodes and edges
 */
export const useInteractive = (graph: GraphWithPlugins) => {
  let lastClickTime = 0;

  const handleNodeCreation = ({ coords, elements }: CanvasGraphMouseEvent) => {
    const ABOUT_A_FEW_HUNDRED_MS = 350;
    const timeDiff = Date.now() - lastClickTime;
    const closeEnoughInTime = timeDiff < ABOUT_A_FEW_HUNDRED_MS;
    if (!closeEnoughInTime) return (lastClickTime = Date.now());
    lastClickTime = 0;

    const topElement = elements.at(-1);
    if (topElement && graph.isNode(topElement.id)) return;

    graph.actions.addNode({ x: coords.x, y: coords.y });
  };

  const doesEdgeConformToRules = (
    sourceNode: { id: string },
    targetNode: { id: string },
  ) => {
    if (graph.settings.userAddedEdgeRuleNoSelfLoops) {
      const violatesRule = sourceNode.id === targetNode.id;
      if (violatesRule) return false;
    }

    if (graph.settings.userAddedEdgeRuleOneEdgePerPath) {
      const edgeBetweenToAndFrom = graph.edges.value.find(
        (edge) =>
          edge.source === sourceNode.id && edge.target === targetNode.id,
      );

      const edgeBetweenFromAndTo = graph.edges.value.find(
        (edge) =>
          edge.source === targetNode.id && edge.target === sourceNode.id,
      );

      const violatesRule = edgeBetweenToAndFrom || edgeBetweenFromAndTo;
      if (violatesRule) return false;
    }

    return true;
  };

  const handleEdgeCreation = (sourceNode: { id: string }) => {
    const { elements: items } = graph.canvas.graphUnderCursor;

    const nodeUnderneathAnchor = items.findLast((i) => i.graphType === 'node');
    if (!nodeUnderneathAnchor) return;

    const targetNode = graph.getNode(nodeUnderneathAnchor.id);
    if (!targetNode) return;

    const canCreateEdge = doesEdgeConformToRules(sourceNode, targetNode);
    if (!canCreateEdge) return;

    graph.actions.addEdge({
      source: sourceNode.id,
      target: targetNode.id,
    });
  };

  const activate = () => {
    graph.events.subscribe('onClick', handleNodeCreation);
    graph.events.subscribe('onNodeAnchorDrop', handleEdgeCreation);
  };

  const deactivate = () => {
    graph.events.unsubscribe('onClick', handleNodeCreation);
    graph.events.unsubscribe('onNodeAnchorDrop', handleEdgeCreation);
  };

  activate();
};
