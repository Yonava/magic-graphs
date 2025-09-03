<script setup lang="ts">
  import CPopoverTooltip from "@magic/ui/core/PopoverTooltip.vue";
  import CButton from "@magic/ui/core/button/Button.vue";
  import GWell from "@magic/products/shared/ui/graph-core/GWell.vue";
  import colors from "@magic/utils/colors";
  import type { SimulationDeclaration } from "@magic/products/types";

  import { computed } from "vue";

  const props = defineProps<{
    simulation: SimulationDeclaration;
  }>();

  const reason = computed(() => props.simulation.canRun?.check());
</script>

<template>
  <div
    v-if="reason"
    class="absolute bg-black w-full h-full z-10 rounded-md bg-opacity-50 grid place-items-center"
  >
    <CPopoverTooltip>
      <CButton
        @mouseenter="reason.themer?.theme()"
        @mouseleave="reason.themer?.untheme()"
        :color="colors.GRAY_900"
        :text-color="colors.RED_500"
        class="text-lg rounded-lg px-2 py-1"
      >
        {{ reason.title }}
      </CButton>
      <template #content>
        <GWell
          tertiary
          class="max-w-72 rounded-lg p-2"
        >
          <span
            v-html="reason.description"
            class="font-bold"
          ></span>
        </GWell>
      </template>
    </CPopoverTooltip>
  </div>
</template>
