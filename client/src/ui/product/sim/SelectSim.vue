<script setup lang="ts">
  import { computed } from 'vue';
  import type { SimulationDeclaration } from 'src/types';
  import GButton from '@ui/graph/button/GButton.vue';
  import CPopover from '@ui/core/Popover.vue';
  import CIcon from '@ui/core/Icon.vue';
  import GWell from '@ui/graph/GWell.vue';
  import SelectSimGuard from './SelectSimGuard.vue';
  import SimCard from './SimCard.vue';

  const props = defineProps<{
    simulations: SimulationDeclaration[];
    disabled?: boolean;
  }>();

  const emits = defineEmits<{
    (e: 'simulation-selected', simulation: SimulationDeclaration): void;
  }>();

  const displayedSimulations = computed(() => {
    const allSimulations = props.simulations;
    const cannotRun = allSimulations.filter((sim) => sim.canRun?.check());
    const canRun = allSimulations.filter((sim) => !sim.canRun?.check());
    return [...canRun, ...cannotRun];
  });
</script>

<template>
  <CPopover>
    <template #activator="{ toggle, isOpen }">
      <GButton
        @click="toggle"
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
