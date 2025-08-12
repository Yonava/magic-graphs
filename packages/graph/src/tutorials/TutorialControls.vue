<script setup lang="ts">
  import type { TutorialControls } from '@graph/tutorials/types';
  import CButton from '@ui/core/button/Button.vue';
  import colors from '@utils/colors';

  const { tutorial } = defineProps<{
    tutorial: TutorialControls;
  }>();
</script>

<template>
  <CButton
    @click="tutorial.prevStep"
    :color="colors.BLUE_600"
  >
    Previous Step
  </CButton>
  <CButton
    @click="tutorial.nextStep"
    :color="colors.BLUE_600"
  >
    Next Step
  </CButton>
  <CButton
    @click="tutorial.stop"
    :color="colors.BLUE_600"
  >
    End Tutorial
  </CButton>
  <CButton
    @click="tutorial.start"
    :color="colors.BLUE_600"
  >
    Restart Tutorial
  </CButton>
</template>
