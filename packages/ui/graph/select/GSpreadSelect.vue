<script
  setup
  lang="ts"
  generic="TValue, TItem extends SpreadSelectItem<TValue>"
>
  import GButton from '@ui/graph/button/GButton.vue';
  import { onClickOutside } from '@vueuse/core';

  import { computed, ref } from 'vue';

  import type { SpreadSelectItem } from './SpreadSelectItem';

  const target = ref<HTMLDivElement>();

  const props = withDefaults(
    defineProps<{
      /**
       * the items to be displayed in the spread select.
       * `label` is the text that will be displayed to the user
       * and `value` is the value that will be emitted when the user
       * selects the item
       */
      items: readonly TItem[];
      /**
       * the index of the initial item that will be selected and
       * therefore the first item to greet the user
       * @default 0
       */
      initialItemIndex: number;
    }>(),
    {
      initialItemIndex: 0,
    },
  );

  const selectedItem = defineModel<TValue>();
  selectedItem.value = props.items[props.initialItemIndex].value;
  if (selectedItem.value === undefined)
    throw new Error('invalid initialItemIndex');

  const selectedLabel = computed(() => {
    return props.items.find((item) => item.value === selectedItem.value)?.label;
  });

  const isOpen = defineModel('open', { default: false });

  const toggleMenu = () => (isOpen.value = !isOpen.value);

  onClickOutside(target, () => (isOpen.value = false));

  const selectItem = (item: TItem) => {
    selectedItem.value = item.value;
    isOpen.value = false;
  };

  const isSelected = (item: TItem) => item.value === selectedItem.value;
</script>

<template>
  <div>
    <!-- spread menu -->
    <div
      v-if="isOpen"
      ref="target"
      class="flex gap-2 justify-center"
    >
      <GButton
        v-for="item in items"
        :key="item.label"
        @click="selectItem(item)"
        :class="[
          'rounded-full',
          isSelected(item)
            ? 'opacity-100 ring-white ring-2 ring-inset'
            : 'opacity-75',
        ]"
      >
        <span class="w-12">
          {{ item.label }}
        </span>
      </GButton>
    </div>

    <!-- activator button -->
    <GButton
      v-else-if="selectedLabel"
      @click="toggleMenu"
      class="rounded-full"
    >
      <span class="w-12">
        {{ selectedLabel }}
      </span>
    </GButton>
  </div>
</template>
