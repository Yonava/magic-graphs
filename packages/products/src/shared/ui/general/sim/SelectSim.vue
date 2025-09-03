<script setup lang="ts">
  import CIcon from "../../core/Icon.vue";
  import CPopover from "../../core/Popover.vue";
  import GWell from "../../graph/GWell.vue";
  import GButton from "../../graph/button/GButton.vue";
  import type { SimulationDeclaration } from "@magic/products/types";

  import { computed } from "vue";

  import SelectSimGuard from "./SelectSimGuard.vue";
  import SimCard from "./SimCard.vue";

  const props = defineProps<{
    simulations: SimulationDeclaration[];
    disabled?: boolean;
  }>();

  const emits = defineEmits<{
    (e: "simulation-selected", simulation: SimulationDeclaration): void;
  }>();

  const displayedSimulations = computed(() => {
    const allSimulations = props.simulations;
    const cannotRun = allSimulations.filter((sim) => sim.canRun?.check());
    const canRun = allSimulations.filter((sim) => !sim.canRun?.check());
    return [...canRun, ...cannotRun];
  });

  const playButtonClicked = (openPopover: () => void) => {
    if (props.simulations.length === 1) {
      emits("simulation-selected", props.simulations[0]);
      return;
    }
    openPopover();
  };
</script>

<template>
  <CPopover>
    <template #activator="{ toggle, isOpen }">
      <GButton
        @click="(ev) => playButtonClicked(() => toggle(ev))"
        :tertiary="isOpen"
        :disabled="disabled"
        class="h-14 w-14 rounded-full"
      >
        <CIcon
          class="text-3xl"
          icon="play"
        />
      </GButton>
    </template>

    <GWell
      class="flex flex-col p-2 w-[400px] max-h-[500px] overflow-auto gap-1 rounded-lg"
    >
      <div
        v-for="simulation in displayedSimulations"
        :key="simulation.name"
        class="relative"
      >
        <SelectSimGuard :simulation="simulation" />

        <SimCard
          @click="emits('simulation-selected', simulation)"
          :simulation="simulation"
        />
      </div>
    </GWell>
  </CPopover>
</template>
