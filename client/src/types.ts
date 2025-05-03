import type { RouteRecordRaw } from 'vue-router';
import type { Graph } from '@graph/types';
import type { SimulationRunner } from '@ui/product/sim/types';
import type { ProductCategory } from '@utils/product';
import type { GraphTemplate } from '@graph/templates/types';
import type { SimulationGuard } from '@ui/product/sim/guard';

type AllowGoWithGraph = boolean | ((graph: Graph) => boolean);
/**
 * options for exposing a product to the product dropdown menu
 */
export type ProductDropdownInfo = {
  /**
   * the name of the menu item
   */
  name: string;
  /**
   * the description of the menu item
   */
  description: string;
  /**
   * an image to display in the menu
   */
  thumbnail: string;
  /**
   * the category of the product
   */
  category: ProductCategory;
  /**
   * whether the product allows transfer of graphs between products
   */
  allowGoWithGraph?: AllowGoWithGraph;
};

/**
 * options for exposing a products simulation so it can be consumed by other products
 *
 * ie allows Dijkstras graph simulation to run in the main graph sandbox
 */
export type SimulationDeclaration = {
  /**
   * the name of the simulation, user facing
   */
  name: string;
  /**
   * the description of the simulation, user facing
   */
  description: string;
  /**
   * an image to display in the simulation selection
   */
  thumbnail: string;
  /**
   * a guard for preventing graphs from running unsuitable simulations,
   * if left undefined, the simulation will always be available
   */
  canRun?: SimulationGuard;
  /**
   * the runner for the simulation
   */
  runner: SimulationRunner;
};

export type SimulationDeclarationGetter = (
  graph: Graph,
) => SimulationDeclaration[];

/**
 * interface for exposing a product to global resources
 * like menus, router, and other products
 */
export type ProductInfo = {
  /**
   * consumed by vue-router in order to add it as an available route
   */
  route: RouteRecordRaw;
  /**
   * the name of the product.
   * used as document title
   */
  name: string;
  /**
   * the description of the product
   */
  description: string;
  /**
   * a unique identifier for the product, cannot contain spaces or special characters
   */
  productId: string;
  /**
   * if defined, the product will be added to the main menu
   * with the properties defined here
   */
  menu?: ProductDropdownInfo;
  /**
   * if defined, this products simulations will be exposed to other products
   */
  simulations?: SimulationDeclarationGetter;
  /**
   * points to a products state, must have a `reset` method that resets the state of
   * the product when invoked
   */
  state?: { reset: () => void };

  /**
   *  list of example graphs for the product
   */
  templates?: GraphTemplate[];
};
