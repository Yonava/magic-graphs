<script setup lang="ts">
  import { ref } from 'vue';
  import colors from '@colors';
  import { cross } from '@shapes/cross';
  import type { ShapeFactory, WithId } from '@shape/types';
  import { useAnimatedShapes } from '@shape/animation';
  import MagicCanvas from '@canvas/MagicCanvas.vue';
  import { useMagicCanvas } from '@canvas/index';
  import Button from '@ui/core/button/Button.vue';
  import type { CircleSchema } from '@shape/shapes/circle/types';
  import { getRandomInRange } from '@utils/random';

  const { autoAnimate, shapes } = useAnimatedShapes();

  const paintedShapes = ref<ShapeFactory<WithId<CircleSchema>>[]>([]);

  paintedShapes.value.push(shapes.circle);

  const toggleAutoAnimate = () => {
    const isActive = autoAnimate.isActive('test');
    if (isActive) autoAnimate.stop('test');
    else autoAnimate.start('test');
  };

  const at = ref({ x: 500, y: 0 });

  const moveAtLocation = () => {
    // at.value.x *= -1;
    at.value.x = getRandomInRange(-500, 500);
    at.value.y = getRandomInRange(-500, 500);
  };

  const magic = useMagicCanvas();
  magic.draw.content.value = (ctx) =>
    paintedShapes.value.forEach((factory) =>
      factory({
        id: 'test',
        at: at.value,
        radius: 50,
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
