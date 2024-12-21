import type { GEdge, GNode, Graph } from "@graph/types";
import type { BoundingBox } from "@shape/types";
import { computed, onUnmounted, ref } from "vue";
import { useGraph } from "@graph/useGraph";
import { getEncapsulatedNodeBox } from "@graph/plugins/marquee/helpers";
import { getCtx } from "@utils/ctx";

export const useSnapshot = (graph: Graph) => {
  return (graphState: { nodes: GNode[]; edges: GEdge[] }) => {
    const tempCanvas = ref(document.createElement("canvas"));
    const tempGraph = useGraph(tempCanvas);
    const snapshot = ref<string>();

    const createImageFromCanvasRegion = (
      canvas: HTMLCanvasElement,
      boundingBox: BoundingBox
    ) => {
      const { at, width, height } = boundingBox;
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = width;
      tempCanvas.height = height;
      const tempCtx = getCtx(tempCanvas);

      tempCtx.drawImage(
        canvas, // Source canvas
        at.x,
        at.y, // Source start x, y
        width,
        height, // Source width, height
        0,
        0, // Destination start x, y
        width,
        height // Destination width, height
      );

      const dataURL = tempCanvas.toDataURL();

      tempCanvas.remove();

      return dataURL;
    };

    const takeSnapshot = async () => {
      tempCanvas.value.width = 5000;
      tempCanvas.value.height = 5000;
      await new Promise((resolve) => setTimeout(resolve, 50));
      
      tempGraph.load(graphState);
      tempGraph.themeName.value = graph.themeName.value;
      await new Promise((resolve) => setTimeout(resolve, 50)); // gives time to load in new graph

      const boundingBox = getEncapsulatedNodeBox(
        tempGraph.nodes.value,
        tempGraph
      );

     snapshot.value = createImageFromCanvasRegion(
        tempCanvas.value,
        boundingBox
      );
      tempCanvas.value.width = 0;
      tempCanvas.value.height = 0;
    };

    takeSnapshot();
    graph.subscribe("onThemeChange", takeSnapshot);

    onUnmounted(() => {
      graph.unsubscribe("onThemeChange", takeSnapshot);
      tempCanvas.value.remove();
    });

    return computed(() => snapshot.value);
  };
};
