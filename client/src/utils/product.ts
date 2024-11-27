import { useRoute, useRouter } from "vue-router"
import type { Graph } from "@graph/types"
import type { ProductInfo, SimulationDeclarationGetter } from "src/types"

// imports all route.ts files dynamically
const infoModules = import.meta.glob<{
  default: ProductInfo
}>('/src/**/info.ts', { eager: true })

export const products = Object.values(infoModules).flatMap((mod) => mod.default)
export const productRoutes = products.map((product) => product.route)

export type ProductMap = Record<ProductInfo['productId'], ProductInfo>

export const productIdToProduct = products.reduce<ProductMap>((acc, product) => {
  acc[product.productId] = product
  return acc
}, {});

export type ProductInfoWithMenu = ProductInfo & Required<Pick<ProductInfo, "menu">>;

export type RouteToProduct = Record<string, ProductInfo>

export const routeToProduct = products.reduce<RouteToProduct>((acc, product) => {
  acc[product.route.path] = product
  return acc
}, {})

/**
 * initializes the simulation declarations for all products with the context of the
 * provided graph
 */
export const getSimulationDeclarations = (graph: Graph) => {
  const simulationDeclarationGetters = products
    .map((info) => info.simulations)
    .filter(Boolean) as SimulationDeclarationGetter[];

  const simulations = simulationDeclarationGetters
    .map((getter) => getter(graph))
    .flat();

  return simulations;
}

/**
 * @returns handlers for routing between products
 */
export const useProductRouting = () => {
  const route = useRoute();
  const router = useRouter();

  const productLink = (productRoute: string) => {
    const roomId = route.query.rid;
    const roomIdValid = typeof roomId === "string" && roomId.length > 0;
    return roomIdValid ? `${productRoute}?rid=${roomId}` : productRoute;
  };

  const navigate = (product: ProductInfo) => {
    const redirectLink = product.route?.redirect?.toString();
    const goingExternal = redirectLink?.startsWith("http");

    if (redirectLink && goingExternal) {
      return window.open(redirectLink, "_blank");
    }

    router.push(productLink(product.route.path));
  };

  return {
    navigate,
    productLink,
  };
}