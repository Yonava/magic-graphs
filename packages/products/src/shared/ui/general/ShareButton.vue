<script setup lang="ts">
  import { nonNullGraph as graph } from "@magic/products/shared/globalGraph";
  import {
    encodeCompressedTransitData,
    getTransitData,
  } from "@magic/graph/transit";
  import { SHARE_GRAPH_QUERY_PARAM_KEY } from "@magic/products/shared/useGraphProduct";
  import CIcon from "@magic/ui/core/Icon.vue";
  import GButton from "@magic/products/shared/ui/graph-core/button/GButton.vue";
  import { compressToEncodedURIComponent } from "lz-string";
  import { useToast } from "primevue/usetoast";

  import { computed, ref } from "vue";

  import { useRoute } from "vue-router";

  const route = useRoute();
  const linkCopied = ref(false);
  const clipboardCopyError = ref(false);

  const toast = useToast();

  const resetButtonState = () => {
    linkCopied.value = false;
    clipboardCopyError.value = false;
  };

  const copyLink = async () => {
    if (linkCopied.value) return;
    try {
      const uncompressedData = getTransitData(graph.value);
      const data = encodeCompressedTransitData(uncompressedData);
      const compressedUriData = compressToEncodedURIComponent(data);

      const shareKey = SHARE_GRAPH_QUERY_PARAM_KEY;
      const baseUrl = `${location.origin}${route.path}`;
      const url = `${baseUrl}?${shareKey}=${compressedUriData}`;

      await navigator.clipboard.writeText(url);
      linkCopied.value = true;

      toast.add({
        summary: "Graph Share Link Copied to Clipboard!",
        life: 3000,
        severity: "success",
      });
    } catch (e) {
      clipboardCopyError.value = true;

      toast.add({
        summary: "Failed to copy share link to clipboard!",
        life: 3000,
        severity: "error",
      });
      console.error(e);
    } finally {
      setTimeout(resetButtonState, 3000);
    }
  };

  const icon = computed(() => {
    if (linkCopied.value) return "check";
    if (clipboardCopyError.value) return "alert";
    return "share";
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
