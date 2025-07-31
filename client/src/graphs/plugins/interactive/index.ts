import type { BaseGraph } from '@graph/base';
import type { GraphMouseEvent } from '@graph/base/types';
import type { GNode } from '@graph/types';

/**
 * interactive allows users to create, edit and delete nodes and edges
 */
export const useInteractive = (graph: BaseGraph) => {
  let lastClickTime = 0;

  const handleNodeCreation = ({ coords, items }: GraphMouseEvent) => {
    const ABOUT_A_FEW_HUNDRED_MS = 350;
    const timeDiff = Date.now() - lastClickTime;
    const closeEnoughInTime = timeDiff < ABOUT_A_FEW_HUNDRED_MS;
    if (!closeEnoughInTime) return (lastClickTime = Date.now());
    lastClickTime = 0;

    if (items.at(-1)?.graphType === 'node') return;

    graph.addNode(coords);
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
    const { items } = graph.graphAtMousePosition.value;

    const nodeUnderneathAnchor = items.findLast((i) => i.graphType === 'node');
    if (!nodeUnderneathAnchor) return;

    const toNode = graph.getNode(nodeUnderneathAnchor.id);
    if (!toNode) return;

    const canCreateEdge = doesEdgeConformToRules(fromNode, toNode);
    if (!canCreateEdge) return;

    graph.addEdge({
      from: fromNode.id,
      to: toNode.id,
      label: graph.settings.value.userAddedEdgeLabel,
    });
  };

  const activate = () => {
    graph.subscribe('onClick', handleNodeCreation);
    graph.subscribe('onNodeAnchorDrop', handleEdgeCreation);
    graph.settings.value.nodeAnchors = true;
    graph.settings.value.edgeLabelsEditable = true;
  };

  const deactivate = () => {
    graph.unsubscribe('onClick', handleNodeCreation);
    graph.unsubscribe('onNodeAnchorDrop', handleEdgeCreation);
    graph.settings.value.nodeAnchors = false;
    graph.settings.value.edgeLabelsEditable = false;
  };

  if (graph.settings.value.interactive) activate();
  if (!graph.settings.value.interactive) deactivate();

  graph.subscribe('onSettingsChange', (diff) => {
    if (diff.interactive === true) activate();
    else if (diff.interactive === false) deactivate();
  });
};
