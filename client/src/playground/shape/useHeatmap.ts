import { computed, ref, watch } from 'vue';
import type { Ref } from 'vue';
import colors from '@colors';
import type { Coordinate, Shape } from '@shape/types';
import { circle } from '@shapes';
import type { CircleSchema } from '@shape/shapes/circle';
import { getCtx } from '@utils/ctx';
import { debounce } from '@utils/debounce';

/**
 * the color when the point is not hitting any shape
 */
const MISS_COLOR = colors.GREEN_500;

/**
 * the color when the point is hitting a shape, but not an embedded text area
 */
const HIT_COLOR = colors.RED_500;

/**
 * the color when the point is hitting a text area of a shape
 */
const TEXT_HIT_COLOR = colors.YELLOW_500;

/**
 * effortlessly figure out which parts of the canvas are being hit by shapes
 *
 * @param canvas the canvas element
 * @param drawItems the shapes being rendered on the canvas
 * @returns heatmap controls
 */
export const useHeatmap = (
  targetCanvas: Ref<HTMLCanvasElement | null | undefined>,
  drawItems: Ref<Shape[]>,
) => {
  const active = ref(false);
  const resolution = ref(4);
  const opacity = ref(99);
  const pointsSampled = ref(0);

  const opacityStr = computed(() => {
    if (opacity.value < 1) return '00';
    else if (opacity.value < 10) return `0${opacity.value}`;
    else if (opacity.value > 99) return '';
    return opacity.value.toString();
  });

  const canvas = document.createElement('canvas');

  const initCanvas = () => {
    if (!targetCanvas.value) throw new Error('target canvas not found');
    const { width, height } = targetCanvas.value.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    const canvasContainer = document.getElementById(
      'responsive-canvas-container',
    );
    if (!canvasContainer) throw new Error('Canvas container not found');
    canvasContainer.appendChild(canvas);
  };

  const heatmapMode = ref<'efficient' | 'precise'>('precise');

  const toggleHeatmapMode = () => {
    heatmapMode.value =
      heatmapMode.value === 'efficient' ? 'precise' : 'efficient';
    run();
  };

  const processPoint = (coords: Coordinate) => {
    const shapeHit =
      heatmapMode.value === 'precise'
        ? drawItems.value.findLast((item) => item.shapeHitbox(coords))
        : drawItems.value.findLast((item) =>
          item.efficientHitbox({ at: coords, width: 1, height: 1 }),
        );

    const textHit = drawItems.value.findLast((item) =>
      item.textHitbox?.(coords),
    );

    const circleSchema: CircleSchema = {
      at: coords,
      radius: 2,
      color: MISS_COLOR + opacityStr.value,
    };

    if (textHit) circleSchema.color = TEXT_HIT_COLOR + opacityStr.value;
    else if (shapeHit) circleSchema.color = HIT_COLOR + opacityStr.value;

    const ctx = getCtx(canvas);
    circle(circleSchema).draw(ctx);
  };

  const run = async () => {
    const ctx = getCtx(canvas);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pointsSampled.value = 0;

    if (!canvas || !active.value) return;

    const { width, height } = canvas.getBoundingClientRect();

    for (let y = 0; y < height; y += resolution.value) {
      for (let x = 0; x < width; x += resolution.value) {
        if (pointsSampled.value % 20_000 === 0)
          await new Promise((resolve) => setTimeout(resolve, 10));
        processPoint({ x, y });
        pointsSampled.value++;
      }
    }
  };
  watch(active, run);

  const debouncedRunner = debounce(run, 500);
  watch(resolution, debouncedRunner);
  watch(opacity, debouncedRunner);
  watch(drawItems, debouncedRunner);

  setTimeout(initCanvas, 500);

  return {
    heatmapActive: active,
    heatmapOpacity: opacity,
    heatmapResolution: resolution,
    runHeatmap: run,
    runHeatmapDebounced: debouncedRunner,
    pointsSampled,
    toggleHeatmapMode,
    heatmapMode,
  };
};
