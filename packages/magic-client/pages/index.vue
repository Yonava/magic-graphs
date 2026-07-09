<script setup lang="ts">
  import Button from '@core/components/Button';
  import Dropdown from '@core/components/Dropdown';
  import DropdownItem from '@core/components/DropdownItem';
  import Icon from '@core/components/Icon';
  import IconButton from '@core/components/IconButton';
  import ToggleButton from '@core/components/ToggleButton';
  import ToggleButtonGroup from '@core/components/ToggleButtonGroup';
  import ToggleButtonGroupItem from '@core/components/ToggleButtonGroupItem';
  import Tooltip from '@core/components/Tooltip';
  import { mdiPlus, mdiStar } from '@mdi/js';

  useSeoMeta({
    title: 'Magic Graphs',
    description: 'Hello world from Nuxt SSG.',
  });

  const alignment = ref<string>('left');
</script>

<template>
  <main class="flex h-full flex-col items-center justify-center gap-4">
    <h1 class="text-2xl text-red-500 font-semibold">Hello world</h1>
    <Button>
      <template #start>
        <Icon
          :path="mdiPlus"
          :size="16"
        />
      </template>
      Click me
    </Button>
    <Tooltip label="A vertex is a node in the graph.">
      <template #trigger>
        <Button variant="outline">Vertex</Button>
      </template>
    </Tooltip>
    <Icon
      :path="mdiStar"
      class="text-amber-500"
    />
    <IconButton
      :path="mdiPlus"
      label="Add node"
      variant="outline"
    />
    <Dropdown>
      <template #trigger>
        <Button variant="outline">Products</Button>
      </template>
      <DropdownItem>
        <a
          href="#"
          class="block rounded-sm px-3 py-2 text-sm"
          >Sandbox</a
        >
      </DropdownItem>
      <DropdownItem>
        <a
          href="#"
          class="block rounded-sm px-3 py-2 text-sm"
          >Basic Search</a
        >
      </DropdownItem>
      <DropdownItem>
        <a
          href="#"
          class="block rounded-sm px-3 py-2 text-sm"
          >Dijkstras Algorithm</a
        >
      </DropdownItem>
    </Dropdown>
    <ToggleButton>Toggle Button</ToggleButton>
    <ToggleButtonGroup v-model="alignment">
      <ToggleButtonGroupItem value="left">Left</ToggleButtonGroupItem>
      <ToggleButtonGroupItem value="center">Center</ToggleButtonGroupItem>
      <ToggleButtonGroupItem value="right">Right</ToggleButtonGroupItem>
    </ToggleButtonGroup>
    <p>Alignment: {{ alignment }}</p>
  </main>
</template>
