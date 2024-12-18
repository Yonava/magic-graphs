import type { Graph } from "@graph/types";
import type { GraphTemplate } from "./types";
import { computed, ref } from "vue";
import {
  centerNodesOnOriginCoordinates,
  getAverageCoordinatesOfNodes,
  getNodesBoundingBox,
} from "./helpers";
import { generateId } from "@utils/id";
import { useLocalStorage } from "@vueuse/core";
import { createImageFromCanvasRegion } from "./snapshot";
import { products } from "@utils/product";

export const useGraphTemplate = (graph: Graph) => {
  const userTemplates = useLocalStorage<GraphTemplate[]>(
    "graph-templates",
    []
  );
  const productTemplates = ref<GraphTemplate[]>(
    products.flatMap((p) => p.templates ?? [])
  );

  const templates = computed(() => [
    ...userTemplates.value, // user templates first so easier to find
    ...productTemplates.value,
  ]);

  const add = (
    options: Pick<GraphTemplate, "title" | "description" | "thumbnail">
  ) => {
    const { nodes, edges, canvas } = graph;

    if (!canvas.value) throw new Error("no snapshot canvas found");

    const nodeRadius = graph.baseTheme.value.nodeSize;
    const nodeBorderWidth = graph.baseTheme.value.nodeBorderWidth;
    const boundingBox = getNodesBoundingBox(
      nodes.value,
      nodeRadius + nodeBorderWidth / 2
    );

    const thumbnail = createImageFromCanvasRegion(
      canvas.value,
      boundingBox
    );

    userTemplates.value.push({
      id: generateId(),
      thumbnail,
      isUserAdded: true,
      ...options,
      graphState: {
        nodes: JSON.parse(JSON.stringify(nodes.value)),
        edges: JSON.parse(JSON.stringify(edges.value)),
      },
    });
  };

  const load = (templateId: GraphTemplate["id"]) => {
    const template = templates.value.find((t) => t.id === templateId);
    if (!template) {
      throw new Error(`template could not be loaded: ${templateId} not found`);
    }

    const { nodes, edges } = template.graphState;
    const coords = getAverageCoordinatesOfNodes(graph.nodes.value);
    graph.load({
      nodes: centerNodesOnOriginCoordinates(nodes, coords),
      edges,
    });
  };

  const clearUserTemplates = () => (userTemplates.value = []);

  const removeUserTemplate = (templateId: GraphTemplate["id"]) => {
    userTemplates.value = userTemplates.value.filter(
      (t) => t.id !== templateId
    );
  };

  return {
    add,
    load,
    clearUserTemplates,
    removeUserTemplate,

    templates,
    userTemplates,
    productTemplates,
  };
};
