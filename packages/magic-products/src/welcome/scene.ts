import colors, { Color } from '@core/utils/colors';
import { MagicProduct, productList } from '@magic/shared/ui/index';

type ProductId = keyof typeof productList;

export type WelcomeNode = {
  productId: ProductId;
  /** canvas coordinates, placed by hand */
  position: { x: number; y: number };
  color: Color;
};

/**
 * one row per node on the landing page, in the order the ring connects them and
 * animates them in. placed by hand rather than computed so any single node can be
 * moved or recolored without disturbing the others
 */
export const welcomeNodes: WelcomeNode[] = [
  {
    productId: 'avl-trees',
    position: { x: 960, y: 320 },
    color: colors.PURPLE_500,
  },
  {
    productId: 'traversals',
    position: { x: 960, y: 580 },
    color: colors.PINK_500,
  },
  {
    productId: 'path-finding',
    position: { x: 480, y: 580 },
    color: colors.ORANGE_500,
  },
  {
    productId: 'min-spanning-trees',
    position: { x: 480, y: 320 },
    color: colors.CYAN_500,
  },
];

export const NODE_RADIUS = 45;

export const nodeIdOf = (productId: ProductId) => `welcome/node/${productId}`;

export const edgeIdOf = (index: number) => `welcome/edge/${index}`;

export const productOf = (productId: ProductId): MagicProduct => ({
  id: productId,
  ...productList[productId],
});
