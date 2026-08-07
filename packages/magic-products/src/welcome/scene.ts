import colors, { Color } from '@core/utils/colors';
import { MagicProduct, products } from '@magic/shared/ui/index';

/** the products that get a node on the canvas, in the order they are laid out */
export const featuredProducts: MagicProduct[] = products.filter(
  ({ hidden }) => !hidden,
);

/**
 * cycled by position rather than assigned per product, so a new product shows up
 * on the landing page wearing a color without anyone having to pick one. the ramp
 * runs through our purple to orange brand gradient
 */
const palette: Color[] = [
  colors.PURPLE_500,
  colors.PINK_500,
  colors.ORANGE_500,
  colors.CYAN_500,
];

export const paintOf = (index: number) => palette[index % palette.length]!;

/** product nodes are larger than the ones a visitor makes, so they read as the invitation */
export const PRODUCT_NODE_RADIUS = 45;

export const nodeIdOf = ({ id }: MagicProduct) => `welcome/node/${id}`;

export const edgeIdOf = (index: number) => `welcome/edge/${index}`;

type Viewport = { width: number; height: number };

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

/**
 * an ellipse rather than a circle because the banner and the action bar own the
 * top and bottom of the screen, and the half step offset keeps any single node
 * from landing dead center under either of them
 */
export const ringPositions = (count: number, viewport: Viewport) => {
  const radiusX = clamp(viewport.width * 0.24, 180, 420);
  const radiusY = clamp(viewport.height * 0.2, 130, 260);
  const center = { x: viewport.width / 2, y: viewport.height / 2 };

  return Array.from({ length: count }, (_, index) => {
    const turn = (index + 0.5) / count;
    const angle = turn * Math.PI * 2 - Math.PI / 2;
    return {
      x: center.x + Math.cos(angle) * radiusX,
      y: center.y + Math.sin(angle) * radiusY,
    };
  });
};
