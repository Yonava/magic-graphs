import { onBeforeUnmount, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import type { Graph } from '@graph/types';
import { collabControls } from '@graph/collab';
import type { ProductInfo } from 'src/types';
import { routeToProduct } from '@utils/product';
import {
  graph as globalGraph,
  queuedGraphStateLoadout,
  queuedGraphAnnotationState,
} from '@graph/global';

export const getProductFromCurrentRoute = () => {
  const route = useRoute();

  const productInfo = routeToProduct[route.path];
  if (!productInfo) {
    throw new Error(`no product found for route ${route.path}`);
  }

  return productInfo
}

/**
 * bootstraps and breaks down a graph centric product, connecting to a room if a room id is provided
 * in the query and performing various other configuration tasks such as setting the document title.
 *
 * @param graph the graph instance of the product
 * @param product the product info for the product (inferred from the route if not provided)
 */
export const useGraphProduct = (graph: Graph, product?: ProductInfo) => {
  const route = useRoute();

  if (!product) {
    product = getProductFromCurrentRoute()
  }

  const { connectToRoom } = collabControls;
  const roomId = route.query.rid;

  const { productId, name } = product;
  document.title = `${name} - Magic Graphs`;

  globalGraph.value = graph;

  setTimeout(() => {
    if (!queuedGraphStateLoadout.value) return;
    graph.load(queuedGraphStateLoadout.value);
    queuedGraphStateLoadout.value = undefined;
  }, 5);

  setTimeout(() => {
    if (!queuedGraphAnnotationState.value) return;
    graph.annotation.load(queuedGraphAnnotationState.value);
    queuedGraphAnnotationState.value = undefined;
  }, 5);

  onMounted(() => {
    if (!roomId) return;
    if (typeof roomId !== 'string')
      return console.error('room id must be a string');

    connectToRoom({
      graph,
      roomId,
      productId,
    });
  });

  onBeforeUnmount(() => {
    product.state?.reset();
  });

  return product
};
