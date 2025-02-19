import type { GNode } from "@graph/types";
import type { BaseGraph } from "@graph/base";
import type { GraphMouseEvent } from "@graph/base/types";
import type { NodeAnchor } from "@graph/plugins/anchors/types";

/**
 * interactive allows users to create, edit and delete nodes and edges
 */
export const useInteractive = (graph: BaseGraph) => {
  const handleNodeCreation = ({ coords, event }: GraphMouseEvent) => {
    const nodeAdded = graph.addNode(coords);
    if (!nodeAdded) return;
    setTimeout(() => graph.updateGraphAtMousePosition(event), 10);
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

  const handleEdgeCreation = (fromNode: GNode, anchor: NodeAnchor) => {
    const itemStack = graph.getSchemaItemsByCoordinates(anchor);
    const toNodeSchema = itemStack.findLast(
      (item) => item.graphType === "node",
    );
    if (!toNodeSchema) return;
    const toNode = graph.getNode(toNodeSchema.id);
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
    graph.subscribe("onDblClick", handleNodeCreation);
    graph.subscribe("onNodeAnchorDrop", handleEdgeCreation);
    graph.settings.value.nodeAnchors = true;
    graph.settings.value.edgeLabelsEditable = true;
  };

  const deactivate = () => {
    graph.unsubscribe("onDblClick", handleNodeCreation);
    graph.unsubscribe("onNodeAnchorDrop", handleEdgeCreation);
    graph.settings.value.nodeAnchors = false;
    graph.settings.value.edgeLabelsEditable = false;
  };

  if (graph.settings.value.interactive) activate();
  if (!graph.settings.value.interactive) deactivate();

  graph.subscribe("onSettingsChange", (diff) => {
    if (diff.interactive === true) activate();
    else if (diff.interactive === false) deactivate();
  });
};
