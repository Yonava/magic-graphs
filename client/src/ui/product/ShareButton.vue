<script setup lang="ts">
  import GButton from '@ui/graph/button/GButton.vue';
  import CIcon from '@ui/core/Icon.vue';
  import { computed, ref } from 'vue';
  import { getTransitData } from '@graph/transit';
  import { nonNullGraph as graph } from '@graph/global';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const linkCopied = ref(false);
  const clipboardCopyError = ref(false);

  const resetButtonState = () => {
    linkCopied.value = false;
    clipboardCopyError.value = false;
  };

  const copyLink = async () => {
    if (linkCopied.value) return;
    try {
      const data = getTransitData(graph.value);
      const url = location.host + route.path + '?g=' + JSON.stringify(data);
      await navigator.clipboard.writeText(url);
      linkCopied.value = true;
    } catch (e) {
      clipboardCopyError.value = true;
      console.error(e);
    } finally {
      setTimeout(resetButtonState, 3000);
    }
  };

  const icon = computed(() => {
    if (linkCopied.value) return 'check';
    if (clipboardCopyError.value) return 'alert';
    return 'share';
  });
</script>

<template>
  <GButton
    @click="copyLink"
    :disabled="linkCopied || clipboardCopyError"
    class="h-12 w-12"
  >
    <CIcon
      class="text-3xl"
      :icon="icon"
    />
  </GButton>
</template>
