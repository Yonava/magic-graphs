<script setup lang="ts">
  import { ref } from 'vue';
  import colors, { type Color } from '@colors';
  import { cross } from '@shapes/cross';
  import type { ShapeFactory, WithId } from '@shape/types';
  import { useAnimatedShapes } from '@shape/animation';
  import MagicCanvas from '@canvas/MagicCanvas.vue';
  import { useMagicCanvas } from '@canvas/index';
  import Button from '@ui/core/button/Button.vue';
  import { getRandomInRange } from '@utils/random';
  import type { LineSchema } from '@shape/shapes/line/types';
  import type { CircleSchema } from '@shape/shapes/circle/types';

  const { autoAnimate, shapes } = useAnimatedShapes();

  autoAnimate.start('test');

  // const paintedShapes = ref<ShapeFactory<WithId<LineSchema>>[]>([]);
  const paintedShapes = ref<ShapeFactory<WithId<CircleSchema>>[]>([]);

  // paintedShapes.value.push(shapes.arrow);
  paintedShapes.value.push(shapes.circle);

  const toggleAutoAnimate = () => {
    const isActive = autoAnimate.isActive('test');
    if (isActive) autoAnimate.stop('test');
    else autoAnimate.start('test');
  };

  const start = ref({ x: 500, y: 0 });
  const end = ref({ x: 0, y: 0 });
  const lineWidth = ref(20);
  const fillColor = ref<Color | undefined>(undefined);

  const moveAtLocation = () => {
    start.value.x = getRandomInRange(-500, 500);
    start.value.y = getRandomInRange(-500, 500);

    end.value.x = getRandomInRange(-200, 200);
    end.value.y = getRandomInRange(-200, 200);

    lineWidth.value = getRandomInRange(10, 100);
    fillColor.value = `rgb(${getRandomInRange(0, 255)}, ${getRandomInRange(0, 255)}, ${getRandomInRange(0, 255)})`;
  };

  const magic = useMagicCanvas();
  magic.draw.content.value = (ctx) =>
    paintedShapes.value.forEach((factory) =>
      // factory({
      //   id: 'test',
      //   start: start.value,
      //   end: end.value,
      //   lineWidth: lineWidth.value,
      // }).draw(ctx),
      factory({
        id: 'test',
        radius: lineWidth.value,
        at: end.value,
        fillColor: fillColor.value,
      }).draw(ctx),
    );

  magic.draw.backgroundPattern.value = (ctx, at) => {
    cross({
      at,
      size: 14,
      lineWidth: 1,
      fillColor: colors.GRAY_600,
    }).draw(ctx);
  };
</script>

<template>
  <div class="h-full w-full">
    <div class="absolute m-3 flex gap-3 z-50">
      <Button @click="toggleAutoAnimate">Toggle Auto-Animate</Button>
      <Button @click="moveAtLocation"> Move </Button>
    </div>

    <MagicCanvas
      v-bind="magic.ref"
      class="bg-gray-700"
    />
  </div>
</template>
