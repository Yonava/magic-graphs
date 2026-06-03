import type { GNode } from '../../types.ts';
import { GraphWithPlugins } from '../../useGraph.ts';
import { CanvasGraphMouseEvent } from '../canvas/events.ts';

/**
 * interactive allows users to create, edit and delete nodes and edges
 */
export const useInteractive = (graph: GraphWithPlugins) => {
  let lastClickTime = 0;

  const handleNodeCreation = ({ coords, items }: CanvasGraphMouseEvent) => {
    const ABOUT_A_FEW_HUNDRED_MS = 350;
    const timeDiff = Date.now() - lastClickTime;
    const closeEnoughInTime = timeDiff < ABOUT_A_FEW_HUNDRED_MS;
    if (!closeEnoughInTime) return (lastClickTime = Date.now());
    lastClickTime = 0;

    if (items.at(-1)?.graphType === 'node') return;

    graph.actions.addNode(coords);
  };

  const doesEdgeConformToRules = (fromNode: GNode, toNode: GNode) => {
    if (graph.settings.value.userAddedEdgeRuleNoSelfLoops) {
      const violatesRule = fromNode.id === toNode.id;
      if (violatesRule) return false;
    }

    if (graph.settings.value.userAddedEdgeRuleOneEdgePerPath) {
      const edgeBetweenToAndFrom = graph.edges.value.find(
        (edge) => edge.from === fromNode.id && edge.to === toNode.id,
      );

      const edgeBetweenFromAndTo = graph.edges.value.find(
        (edge) => edge.from === toNode.id && edge.to === fromNode.id,
      );

      const violatesRule = edgeBetweenToAndFrom || edgeBetweenFromAndTo;
      if (violatesRule) return false;
    }

    return true;
  };

  const handleEdgeCreation = (fromNode: GNode) => {
    const { items } = graph.canvas.graphAtMousePosition.value;

    const nodeUnderneathAnchor = items.findLast((i) => i.graphType === 'node');
    if (!nodeUnderneathAnchor) return;

    const toNode = graph.getNode(nodeUnderneathAnchor.id);
    if (!toNode) return;

    const canCreateEdge = doesEdgeConformToRules(fromNode, toNode);
    if (!canCreateEdge) return;

    graph.actions.addEdge({
      from: fromNode.id,
      to: toNode.id,
      weight: graph.settings.value.userAddedDefaultEdgeWeight(),
    });
  };

  const activate = () => {
    graph.events.subscribe('onClick', handleNodeCreation);
    graph.events.subscribe('onNodeAnchorDrop', handleEdgeCreation);
    graph.settings.value.nodeAnchors = true;
    graph.settings.value.edgeLabelsEditable = true;
  };

  const deactivate = () => {
    graph.events.unsubscribe('onClick', handleNodeCreation);
    graph.events.unsubscribe('onNodeAnchorDrop', handleEdgeCreation);
    graph.settings.value.nodeAnchors = false;
    graph.settings.value.edgeLabelsEditable = false;
  };

  if (graph.settings.value.interactive) activate();
  if (!graph.settings.value.interactive) deactivate();

  graph.events.subscribe('onSettingsChange', (diff) => {
    if (diff.interactive === true) activate();
    else if (diff.interactive === false) deactivate();
  });
};
