import { getEncapsulatedNodeBox } from '../plugins/marquee/helpers';
import type { Graph } from '../types';
import { useGraph } from '../useGraph';
import { generateId } from '@magic/utils/id';
import { useLocalStorage } from '@vueuse/core';

import { computed, onMounted, onUnmounted, ref } from 'vue';

import {
  centerNodesOnOriginCoordinates,
  createImageFromCanvasRegion,
  getAverageCoordinates,
} from './helpers';
import type { GraphTemplate } from './types';
import { products } from '@magic/products/utils';

export const useGraphTemplate = (graph: Graph) => {
  const userTemplates = useLocalStorage<GraphTemplate[]>('graph-templates', []);

  const tempCanvas = ref(document.createElement('canvas'));
  const tempGraph = useGraph(tempCanvas);

  const productTemplates = ref<GraphTemplate[]>(
    products.flatMap((p) => p.templates ?? []),
  );

  const templates = computed(() => [
    ...userTemplates.value, // user templates first so easier to find
    ...productTemplates.value,
  ]);

  const updateProductThumbnails = async () => {
    tempCanvas.value.width = 5000;
    tempCanvas.value.height = 5000;
    await new Promise((resolve) => setTimeout(resolve, 50)); // gives time to load in canvas size
    for (const template of templates.value) {
      tempGraph.load(template.graphState);
      await new Promise((resolve) => setTimeout(resolve, 50)); // gives time to load in new graph
      tempGraph.themeName.value = graph.themeName.value;
      const boundingBox = getEncapsulatedNodeBox(
        tempGraph.nodes.value,
        tempGraph,
      );
      template.thumbnail = createImageFromCanvasRegion(
        tempCanvas.value,
        boundingBox,
      );
    }
    tempCanvas.value.width = 0; // performance
    tempCanvas.value.height = 0; // large canvases lag even if not rendered on screen
  };

  const add = async (
    options: Pick<GraphTemplate, 'title' | 'description' | 'thumbnail'>,
  ) => {
    tempCanvas.value.width = 5000;
    tempCanvas.value.height = 5000;

    const { nodes, edges, magicCanvas: canvas } = graph;

    if (!canvas.value) throw new Error('no snapshot canvas found');

    const graphState = {
      nodes: JSON.parse(JSON.stringify(nodes.value)),
      edges: JSON.parse(JSON.stringify(edges.value)),
    };

    tempGraph.load(graphState);
    await new Promise((resolve) => setTimeout(resolve, 50)); // gives time to load in new graph
    tempGraph.themeName.value = graph.themeName.value;
    const boundingBox = getEncapsulatedNodeBox(
      tempGraph.nodes.value,
      tempGraph,
    );
    const thumbnail = createImageFromCanvasRegion(
      tempCanvas.value,
      boundingBox,
    );

    userTemplates.value.unshift({
      id: generateId(),
      isUserAdded: true,
      thumbnail,
      ...options,
      graphState,
    });

    tempCanvas.value.width = 0; // performance
    tempCanvas.value.height = 0; // large canvases lag even if not rendered on screen
  };

  const load = (templateId: GraphTemplate['id']) => {
    const template = templates.value.find((t) => t.id === templateId);
    if (!template) {
      throw new Error(`template could not be loaded: ${templateId} not found`);
    }

    const { nodes, edges } = template.graphState;
    const coords = getAverageCoordinates(graph.nodes.value);
    graph.load({
      nodes: centerNodesOnOriginCoordinates(nodes, coords),
      edges,
    });
  };

  const clearUserTemplates = () => (userTemplates.value = []);

  const removeUserTemplate = (templateId: GraphTemplate['id']) => {
    userTemplates.value = userTemplates.value.filter(
      (t) => t.id !== templateId,
    );
  };

  onMounted(() => {
    updateProductThumbnails();
    graph.subscribe('onThemeChange', updateProductThumbnails);
  });

  onUnmounted(() => {
    graph.unsubscribe('onThemeChange', updateProductThumbnails);
    tempCanvas.value.remove();
  });

  return {
    add,
    load,
    clearUserTemplates,
    removeUserTemplate,
    updateProductThumbnails,

    templates,
    userTemplates,
    productTemplates,

    tempGraph,
    tempCanvas,
  };
};
