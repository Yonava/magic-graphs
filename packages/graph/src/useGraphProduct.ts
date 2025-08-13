import { collabControls } from './collab';
import { graph as globalGraph } from './global';
import type { Graph } from './types';
import { decompressFromEncodedURIComponent } from 'lz-string';
import { useToast } from 'primevue/usetoast';

import { onBeforeUnmount, onMounted } from 'vue';

import { type LocationQueryValue, useRoute, useRouter } from 'vue-router';

import { USER_PLATFORM } from './plugins/shortcut';
import { decodeCompressedTransitData, setTransitData } from './transit';
import { routeToProduct } from '@magic/products/utils';
import { ProductInfo } from '@magic/products/types';

/**
 * query param key we assign an encoded graph to when sharing
 * a graph via url
 */
export const SHARE_GRAPH_QUERY_PARAM_KEY = 'g';

export const getProductFromCurrentRoute = (routePath: string) => {
  const productInfo = routeToProduct[routePath];
  if (!productInfo) {
    throw new Error(`no product found for route ${routePath}`);
  }

  return productInfo;
};

const loadSharedGraphFromQuery = (
  graph: Graph,
  compressedAndUriEncodedTransitData: LocationQueryValue | LocationQueryValue[],
) => {
  const router = useRouter();
  const route = useRoute();
  const toast = useToast();

  const successToast = () => {
    const undoShortcut = USER_PLATFORM === 'Mac' ? '⌘+Z' : 'Ctrl+Z';
    toast.add({
      summary: `Loaded graph from link successfully. Press ${undoShortcut} to undo.`,
      severity: 'success',
      life: 5000,
    });
  };

  const failedToast = () =>
    toast.add({
      summary: 'Failed to load graph from link 😕',
      severity: 'error',
      life: 5000,
    });

  router.replace({ path: route.path, query: {} });

  if (typeof compressedAndUriEncodedTransitData !== 'string') {
    console.error('graph share failed - serialized transit data not a string');
    failedToast();
    return;
  }

  try {
    const decodedUriComponent = decompressFromEncodedURIComponent(
      compressedAndUriEncodedTransitData,
    );
    const transitData = decodeCompressedTransitData(decodedUriComponent);

    // wait one tick to allow graph in localStorage to be loaded before overwriting
    setTimeout(() => setTransitData(graph, transitData), 0);

    successToast();
  } catch {
    console.error('graph share failed - could not parse graph transit data');
    failedToast();
  }
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

  const { connectToRoom } = collabControls;
  const roomId = route.query.rid;

  const { productId, name } = product;
  document.title = `${name} - Magic Graphs`;

  globalGraph.value = graph;

  const sharedGraph = route.query[SHARE_GRAPH_QUERY_PARAM_KEY];
  if (sharedGraph) loadSharedGraphFromQuery(graph, sharedGraph);

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

  return product;
};
