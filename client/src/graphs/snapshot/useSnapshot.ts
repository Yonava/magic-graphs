import type { GEdge, GNode, Graph } from "@graph/types";
import type { BoundingBox, Coordinate } from "@shape/types";
import { computed, onUnmounted, ref } from "vue";
import { useGraph } from "@graph/useGraph";
import { getEncapsulatedNodeBox } from "@graph/plugins/marquee/helpers";
import { getCtx } from "@utils/ctx";

export const useSnapshot = (graph: Graph) => {
  return (graphState: { nodes: GNode[]; edges: GEdge[] }) => {
    const snapshot = ref<string>();
    const tempCanvas = ref(document.createElement("canvas"));
    const tempGraph = useGraph(tempCanvas);

    const normalizeNodes = <T extends Coordinate>(nodes: T[]) => {
      const minX = Math.min(...nodes.map((node) => node.x));
      const minY = Math.min(...nodes.map((node) => node.y));

      nodes.forEach((node) => {
        node.x -= minX;
        node.y -= minY;
      });

      return nodes;
    };

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

    const takeSnapshot = () => {
      const { nodes, edges } = graphState;
      const normalizedGraphState = {
        nodes: normalizeNodes(nodes),
        edges,
      };

      tempGraph.load(normalizedGraphState);
      tempGraph.themeName.value = graph.themeName.value;

      const boundingBox = getEncapsulatedNodeBox(
        tempGraph.nodes.value,
        tempGraph
      );

      snapshot.value = createImageFromCanvasRegion(
        tempCanvas.value,
        boundingBox
      );
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
