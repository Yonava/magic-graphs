<script setup lang="ts">
  import CIcon from '@core/ui/core/Icon.vue';
  import colors from '@core/utils/colors';

  import CButton from '../../../shared/ui/graph-core/button/GButton.vue';
</script>

<template>
  <CButton
    :color="colors.RED_500"
    class="h-14 w-14 rounded-full"
  >
    <CIcon
      class="text-3xl"
      icon="stop"
    />
  </CButton>
</template>
