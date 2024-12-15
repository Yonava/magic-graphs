import { ref } from "vue";
import type { GNode, SchemaItem } from "@graph/types";
import type { BaseGraph } from "@graph/base";
import type { GraphMouseEvent } from "@graph/base/types";
import type { NodeAnchor } from "@graph/plugins/anchors/types";
import { generateId } from '@utils/id';
import { circle } from "@shape/circle";

/**
 * interactive allows users to create, edit and delete nodes and edges
 */
export const useInteractive = (graph: BaseGraph) => {
  const handleNodeCreation = ({ coords, event }: GraphMouseEvent) => {
    const nodeAdded = graph.addNode(coords);
    if (!nodeAdded) return;
    setTimeout(() => graph.updateGraphAtMousePosition(event), 10);
  };

  const doesEdgeConformToRules = (
    fromNode: GNode,
    toNode: GNode,
  ) => {
    if (graph.settings.value.userAddedEdgeRuleNoSelfLoops) {
      const violatesRule = fromNode.id === toNode.id;
      if (violatesRule) return false;
    }
  
    if (graph.settings.value.userAddedEdgeRuleOneEdgePerPath) {
      const edgeBetweenToAndFrom = graph.edges.value.find(
        (edge) => edge.from === fromNode.id && edge.to === toNode.id
      );
  
      const edgeBetweenFromAndTo = graph.edges.value.find(
        (edge) => edge.from === toNode.id && edge.to === fromNode.id
      );
  
      const violatesRule = edgeBetweenToAndFrom || edgeBetweenFromAndTo;
      if (violatesRule) return false;
    }
  
    return true;
  };

  const getNodeFromDroppedAnchor = (anchor: NodeAnchor) => {
    const itemStack = graph.getSchemaItemsByCoordinates(anchor);
    const nodeSchema = itemStack.findLast((item) => item.graphType === "node");
    if (!nodeSchema) return;
    const node = graph.getNode(nodeSchema.id);
    return node;
  };

  const anchorBeingDragged = ref<NodeAnchor>()

  const nodeAnchorDragStart = (parentNode: GNode, anchor: NodeAnchor) => {
    anchorBeingDragged.value = anchor
  }

  const handleEdgeCreation = (fromNode: GNode, anchor: NodeAnchor) => {
    anchorBeingDragged.value = undefined

    const toNode = getNodeFromDroppedAnchor(anchor);    
    if (!toNode) return;

    const canCreateEdge = doesEdgeConformToRules(fromNode, toNode);
    if (!canCreateEdge) return;

    graph.addEdge({
      from: fromNode.id,
      to: toNode.id,
      label: graph.settings.value.userAddedEdgeLabel,
    });
  };

  const animateToNode = () => {
    if (!anchorBeingDragged.value) return
    const toNode = getNodeFromDroppedAnchor(anchorBeingDragged.value);
    if (!toNode) return

    const hoverEffectAlreadyPresent = graph.aggregator.value.some(item => item.graphType === 'node-hover-effect')
    if (hoverEffectAlreadyPresent) return

    const { x, y } = toNode

    const toNodeShape = graph.aggregator.value.find(item => item.id === toNode.id)
    if (!toNodeShape) return
    const toNodePriority = toNodeShape.priority
    const circleTemplate = {
      at: { x, y },
      radius: graph.getTheme('nodeSize', toNode) + 10,
      color: graph.getTheme('nodeColor', toNode),
    }
    const nodeHoverEffectShape = circle(circleTemplate)
    const nodeHoverEffectSchema: SchemaItem = {
      id: generateId(),
      graphType: 'node-hover-effect',
      shape: nodeHoverEffectShape,
      priority: toNodePriority - 0.1,
    }

    const instertIntoAggregator = (aggregator: SchemaItem[]) => {
      aggregator.push(nodeHoverEffectSchema)
      return aggregator
    }
    graph.updateAggregator.push(instertIntoAggregator)
  };

  const activate = () => {
    graph.subscribe("onDblClick", handleNodeCreation);
    graph.subscribe("onNodeAnchorDrop", handleEdgeCreation);
    graph.subscribe("onNodeAnchorDragStart", nodeAnchorDragStart);
    graph.subscribe("onMouseMove", animateToNode);
    graph.settings.value.nodeAnchors = true;
    graph.settings.value.edgeLabelsEditable = true;
  };

  const deactivate = () => {
    graph.unsubscribe("onDblClick", handleNodeCreation);
    graph.unsubscribe("onNodeAnchorDrop", handleEdgeCreation);
    graph.unsubscribe("onNodeAnchorDragStart", nodeAnchorDragStart);
    graph.unsubscribe("onMouseMove", animateToNode);
    graph.settings.value.nodeAnchors = false;
    graph.settings.value.edgeLabelsEditable = false;
  };

  if (graph.settings.value.interactive) activate();

  graph.subscribe("onSettingsChange", (diff) => {
    if (diff.interactive === true) activate();
    else if (diff.interactive === false) deactivate();
  });
};
