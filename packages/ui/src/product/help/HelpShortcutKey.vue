<script setup lang="ts">
  import type { Shortcut } from "@magic/graph/plugins/shortcut/types";
  import CIcon from "../../core/Icon.vue";

  import { computed } from "vue";

  const props = defineProps<{
    keyboardKey: Shortcut["binding"];
  }>();

  const KEYBOARD_KEY_TO_USER_STRING: Partial<
    Record<Shortcut["binding"], string>
  > = {
    meta: "⌘",
  };

  const KEYS_WITH_USER_STRING = Object.keys(KEYBOARD_KEY_TO_USER_STRING);

  const KEYBOARD_KEY_TO_ICON: Partial<Record<Shortcut["binding"], string>> = {
    arrowright: "arrow-right",
    arrowleft: "arrow-left",
  };

  const KEYS_WITH_ICONS = Object.keys(KEYBOARD_KEY_TO_ICON);

  const hasIconDepiction = computed(() => {
    return KEYS_WITH_ICONS.includes(props.keyboardKey);
  });

  const hasUserStringDepiction = computed(() => {
    return KEYS_WITH_USER_STRING.includes(props.keyboardKey);
  });
</script>

<template>
  <div
    :class="[
      'border-[1px]',
      'rounded-md',
      'px-2',
      'mx-[1px]',
      'text-xs',
      'capitalize',
      'border-current',
    ]"
  >
    <CIcon
      v-if="hasIconDepiction"
      :icon="KEYBOARD_KEY_TO_ICON[keyboardKey]!"
      class="text-xs"
    />
    <p v-else-if="hasUserStringDepiction">
      {{ KEYBOARD_KEY_TO_USER_STRING[keyboardKey] }}
    </p>
    <p v-else>
      {{ keyboardKey }}
    </p>
  </div>
</template>
