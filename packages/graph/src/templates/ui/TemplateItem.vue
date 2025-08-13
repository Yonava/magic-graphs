<script setup lang="ts">
  import GButton from "@ui/graph/button/GButton.vue";
  import colors from "@magic/utils/colors";

  import { ref, toRefs } from "vue";

  import type { GraphTemplate } from "../types";

  const props = defineProps<{
    template: GraphTemplate;
    load: (id: string) => void;
    remove: (id: string) => void;
  }>();

  const { template } = toRefs(props);

  const hovered = ref(false);
</script>

<template>
  <div
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
    class="relative flex flex-col"
  >
    <div
      class="transition duration-200 p-2"
      :style="{
        opacity: hovered ? 0.5 : 1,
      }"
    >
      <h3 class="text-xl">{{ template.title }}</h3>
      <p class="text-sm font-normal">{{ template.description }}</p>
      <img
        :src="template.thumbnail"
        class="aspect-video h-52 object-contain p-2"
      />
    </div>
    <div
      class="absolute w-full h-full z-10 flex items-center justify-center transition duration-200"
      :style="{
        opacity: hovered ? 1 : 0,
      }"
    >
      <div class="flex gap-2">
        <GButton @click="load(template.id)">Load</GButton>
        <GButton
          v-if="template.isUserAdded"
          @click="remove(template.id)"
          :color="colors.RED_500"
        >
          Delete
        </GButton>
      </div>
    </div>
  </div>
</template>
