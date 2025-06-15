import { useRoute, useRouter } from 'vue-router';
import type { Graph } from '@graph/types';
import type { ProductInfo, SimulationDeclarationGetter } from 'src/types';
import { nonNullGraph as globalGraph } from '@graph/global';
import { getTransitData, setTransitData } from '@graph/transit';

// imports all info.ts files dynamically
const infoModules = import.meta.glob<{
  default: ProductInfo;
}>('/src/**/info.ts', { eager: true });

export const products = Object.values(infoModules).flatMap(
  (mod) => mod.default,
);
export const productRoutes = products.map((product) => product.route);

export type ProductMap = Record<ProductInfo['productId'], ProductInfo>;

export const productIdToProduct = products.reduce<ProductMap>(
  (acc, product) => {
    acc[product.productId] = product;
    return acc;
  },
  {},
);

export type ProductInfoWithMenu = ProductInfo &
  Required<Pick<ProductInfo, 'menu'>>;

export type RouteToProduct = Record<string, ProductInfo>;

export const routeToProduct = products.reduce<RouteToProduct>(
  (acc, product) => {
    acc[product.route.path] = product;
    return acc;
  },
  {},
);

/**
 * initializes the simulation declarations for all products with the context of the
 * provided graph
 */
export const getAllSimulationDeclarations = (graph: Graph) => {
  const simulationDeclarationGetters = products
    .map((info) => info.simulations)
    .filter(Boolean) as SimulationDeclarationGetter[];

  const simulations = simulationDeclarationGetters
    .map((getter) => getter(graph))
    .flat();

  return simulations;
};

/**
 * gets the simulation declarations for a specific product
 *
 * @param graph the graph to use for the simulation declarations
 * @param simDeclarationsGetter the product simulations to get the simulation declarations for, if not provided
 * will find the product using the current route, if the current route has no simulation declarations,
 * will return all simulations
 * @returns the simulation declarations for the product
 * @throws if the product cannot be found
 */
export const getSimulationDeclarationsForProduct = (
  graph: Graph,
  simDeclarationsGetter?: ProductInfo['simulations'],
) => {
  const route = useRoute();

  if (!simDeclarationsGetter) {
    const productAtRoute = routeToProduct[route.path];
    if (!productAtRoute) throw new Error(`product not found for ${route.path}`);
    simDeclarationsGetter = productAtRoute.simulations;
  }

  const getter = simDeclarationsGetter ?? getAllSimulationDeclarations;
  return getter(graph);
};

/**
 * @returns handlers for routing between products
 */
export const useProductRouting = () => {
  const route = useRoute();
  const router = useRouter();

  const productLink = (productRoute: string) => {
    const roomId = route.query.rid;
    const roomIdValid = typeof roomId === 'string' && roomId.length > 0;
    return roomIdValid ? `${productRoute}?rid=${roomId}` : productRoute;
  };

  const navigate = async (product: ProductInfo) => {
    const redirectLink = product.route?.redirect?.toString();
    const goingExternal = redirectLink?.startsWith('http');

    if (redirectLink && goingExternal) {
      return window.open(redirectLink, '_blank');
    }

    await router.push(productLink(product.route.path));
  };

  /**
   * navigate between products while preserving the graph state including
   * annotations and canvas camera positioning
   */
  const navigateWithGraph = async (product: ProductInfo) => {
    const data = getTransitData(globalGraph.value)
    await navigate(product)
    // wait one tick for the global graph to update
    await new Promise((res) => setTimeout(res, 0))
    setTransitData(globalGraph.value, data)
  }

  return {
    navigate,
    navigateWithGraph,
    productLink,
  };
};

/**
 * products are ranked by category in this order on the product dropdown menu
 */
export const PRODUCT_CATEGORY_RANK = [
  'sandbox',
  'algorithms',
  'data structures',
  'math',
  'developer tools',
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORY_RANK)[number];

/**
 * get the product at the current route
 */
export const getCurrentProduct = () => {
  const route = useRoute();
  return routeToProduct[route.path];
};

/**
 * true if the product is external and will be opened in a new tab
 */
export const isExternal = (product: ProductInfo) => {
  return 'redirect' in product.route;
};
