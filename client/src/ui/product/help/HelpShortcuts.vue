<script setup lang="ts">
  import HelpSection from './HelpSection.vue';
  import { computed } from 'vue';
  import { nonNullGraph as graph } from '@graph/global';
  import HelpShortcutKey from './HelpShortcutKey.vue';
  import type { Shortcut } from '@graph/plugins/shortcut/types';
  import { PRODUCT_SHORTCUTS } from '@product/shared/shortcuts';

  /**
   * @example 'Control+Shift+Z' -> ['Control', 'Shift', 'Z']
   */
  const getKeysFromKeyBindStr = (keyBindStr: Shortcut['binding']) =>
    keyBindStr
      .split('+')
      .map((key) => key.trim())
      .filter((key) => key !== '');

  const { activeShortcuts } = graph.value.shortcut;

  const shortcuts = computed(() =>
    Object.assign(activeShortcuts, PRODUCT_SHORTCUTS),
  );
</script>

<template>
  <HelpSection title="Useful Shortcuts">
    <div class="flex flex-col gap-1">
      <div
        v-for="(shortcut, shortcutName) in shortcuts"
        :key="shortcutName"
        class="flex justify-between items-center"
      >
        {{ shortcutName }}
        <div class="flex">
          <div
            v-for="keyboardKey in getKeysFromKeyBindStr(shortcut.binding)"
            :key="keyboardKey"
          >
            <HelpShortcutKey :keyboard-key="keyboardKey" />
          </div>
        </div>
      </div>
    </div>
  </HelpSection>
</template>
