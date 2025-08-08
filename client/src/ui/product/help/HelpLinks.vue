<script setup lang="ts">
  import CIcon from '@ui/core/Icon.vue';
  import GButton from '@ui/graph/button/GButton.vue';

  import HelpSection from './HelpSection.vue';

  const redirect = (route: string) => window.open(route, '_blank');

  const GH_REPO_LINK = 'https://github.com/Yonava/magic-graphs';
  const GH_ISSUE_LINK = `${GH_REPO_LINK}/issues/new?template=Blank%20issue`;
</script>

<template>
  <HelpSection title="Links To Have Handy">
    <div class="flex gap-2 text-sm">
      <GButton
        @click="redirect(GH_ISSUE_LINK)"
        class="flex gap-2"
        tertiary
      >
        <CIcon icon="bug"></CIcon>
        I Found An Issue
      </GButton>
      <GButton
        @click="redirect(GH_REPO_LINK)"
        class="flex gap-2"
        tertiary
      >
        <CIcon icon="github"></CIcon>
        Star Us On GitHub
      </GButton>
    </div>
  </HelpSection>
</template>
