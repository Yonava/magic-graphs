<script setup lang="ts">
  import CIcon from '@ui/core/Icon.vue';
  import CButton from '@ui/graph/button/GButton.vue';
  import colors from '@utils/colors';
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
