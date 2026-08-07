import { nullThrows } from '@core/utils/assert';
import { Color } from '@core/utils/colors';
import { CoreNode } from '@graph/primitives/types';
import { MagicGraph } from '@magic/shared/product/useGraphProduct';
import { MagicProduct } from '@magic/shared/ui/index';
import { useFocusedNode } from '@magic/shared/utilities';
import tinycolor from 'tinycolor2';

import { computed, inject, onMounted, onUnmounted, provide, ref } from 'vue';

import {
  PRODUCT_NODE_RADIUS,
  edgeIdOf,
  featuredProducts,
  nodeIdOf,
  paintOf,
  ringPositions,
} from './scene.ts';

/** how long each node waits before popping in, so the ring assembles itself */
const STAGGER_MS = 90;

const KEY = 'WELCOME_SCENE';

const createWelcomeScene = (graph: MagicGraph) => {
  const productByNodeId = new Map<string, MagicProduct>();
  const paintByNodeId = new Map<string, Color>();

  for (const [index, product] of featuredProducts.entries()) {
    productByNodeId.set(nodeIdOf(product), product);
    paintByNodeId.set(nodeIdOf(product), paintOf(index));
  }

  const paint = ({ id }: CoreNode) => paintByNodeId.get(id);

  const litPaint = (node: CoreNode) => {
    const color = paint(node);
    if (!color) return;
    return tinycolor(color).lighten(8).toHexString();
  };

  // a visitor's own nodes keep the preset size, which is what makes the product
  // nodes read as the ones worth pointing at
  const size = ({ id }: CoreNode) =>
    paintByNodeId.has(id) ? PRODUCT_NODE_RADIUS : undefined;

  graph.theme
    .createThemer({
      canvas: {
        'node.default.color': paint,
        'node.default.size': size,
        'node.hover.color': litPaint,
        'node.hover.size': size,
      },
      focus: {
        'node.focus.color': litPaint,
        'node.focus.size': size,
      },
    })
    .activate();

  const hoveredProduct = ref<MagicProduct>();

  const focusedNode = useFocusedNode(graph);

  const focusedProduct = computed(() => {
    if (!focusedNode.value) return;
    return productByNodeId.get(focusedNode.value.id);
  });

  /** pointing at a product previews it, clicking one pins it */
  const activeProduct = computed(
    () => hoveredProduct.value ?? focusedProduct.value,
  );

  const trackHover = (element: { id: string } | undefined) => {
    hoveredProduct.value = element
      ? productByNodeId.get(element.id)
      : undefined;
  };

  const timeouts: ReturnType<typeof setTimeout>[] = [];

  const schedule = (task: () => void, delayMs: number) => {
    timeouts.push(setTimeout(task, delayMs));
  };

  const addProductNode = (
    product: MagicProduct,
    at: { x: number; y: number },
  ) =>
    graph.animation.capture(() =>
      graph.actions.addNode({
        id: nodeIdOf(product),
        label: product.shortName,
        position: at,
      }),
    );

  const connectRing = () =>
    graph.animation.capture(() =>
      graph.actions.addElements({
        nodes: [],
        edges: featuredProducts.map((product, index) => ({
          id: edgeIdOf(index),
          source: nodeIdOf(product),
          target: nodeIdOf(
            nullThrows(
              featuredProducts[(index + 1) % featuredProducts.length],
              'ring wraps back onto a featured product',
            ),
          ),
        })),
      }),
    );

  const seed = () => {
    const positions = ringPositions(featuredProducts.length, {
      width: window.innerWidth,
      height: window.innerHeight,
    });

    for (const [index, product] of featuredProducts.entries()) {
      const at = nullThrows(
        positions[index],
        'a position is laid out for every featured product',
      );
      schedule(() => addProductNode(product, at), index * STAGGER_MS);
    }

    schedule(connectRing, featuredProducts.length * STAGGER_MS);
  };

  onMounted(() => {
    seed();
    graph.canvas.events.subscribe('onHoveredElementChange', trackHover);
  });

  onUnmounted(() => {
    for (const timeout of timeouts) clearTimeout(timeout);
    graph.canvas.events.unsubscribe('onHoveredElementChange', trackHover);
  });

  return { activeProduct };
};

export type WelcomeScene = ReturnType<typeof createWelcomeScene>;

export const provideWelcomeScene = (graph: MagicGraph) => {
  const scene = createWelcomeScene(graph);
  provide(KEY, scene);
  return scene;
};

export const useWelcomeScene = () =>
  nullThrows(inject<WelcomeScene>(KEY), 'welcome scene not provided!');
