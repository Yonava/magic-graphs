import { onBeforeUnmount } from 'vue';

import { useRoute } from 'vue-router';

import { graph as globalGraph } from '../shared/globalGraph.ts';
import { ProductInfo } from '../types.ts';
import { routeToProduct } from '../utils.ts';
import { Graph } from './useGraphWithCanvas.ts';

export const getProductFromCurrentRoute = (routePath: string) => {
  const productInfo = routeToProduct[routePath];
  if (!productInfo) {
    throw new Error(`no product found for route ${routePath}`);
  }

  return productInfo;
};

/**
 * bootstraps and breaks down a graph product by:
 * - connecting to a room if a room id is provided query param
 * - loads a graph sent in a query param
 * - sets the document title
 * - resets the state of the product when torn down
 *
 * @param graph the graph instance of the product
 * @param product the product info for the product (inferred from the route if not provided)
 */
export const useGraphProduct = (graph: Graph, product?: ProductInfo) => {
  const route = useRoute();

  if (!product) {
    product = getProductFromCurrentRoute(route.path);
  }

  const { name } = product;
  document.title = `${name} - Magic Graphs`;

  globalGraph.value = graph;

  onBeforeUnmount(() => {
    product.state?.reset();
  });

  return product;
};
