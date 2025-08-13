<script setup lang="ts">
  import { nonNullGraph as graph } from "@magic/graph/global";
  import GButton from "@ui/graph/button/GButton.vue";
  import colors from "@utils/colors";

  import state from "../state";

  const { sourceNode, sinkNode } = state;
</script>

<template>
  <div class="flex gap-3">
    <GButton
      v-if="sourceNode.isSetting.value"
      @click="sourceNode.cancelSet"
      :color="colors.RED_500"
      :text-color="colors.WHITE"
    >
      Cancel
    </GButton>

    <GButton
      v-else
      @click="sourceNode.set(graph)"
    >
      Switch Source
    </GButton>

    <GButton
      v-if="sinkNode.isSetting.value"
      @click="sinkNode.cancelSet"
      :color="colors.RED_500"
      :text-color="colors.WHITE"
    >
      Cancel
    </GButton>

    <GButton
      v-else
      @click="sinkNode.set(graph)"
    >
      Switch Sink
    </GButton>
  </div>
</template>
