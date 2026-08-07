<script setup lang="ts">
  import { GraphProduct, useGraphProduct } from '@magic/shared/product';

  import ActionBar from './ActionBar.vue';
  import WelcomeBanner from './WelcomeBanner.vue';
  import { manifest } from './manifest.ts';
  import { provideWelcomeScene } from './useWelcomeScene.ts';

  const graph = useGraphProduct({
    manifest,
    // the scene is seeded fresh on every visit, so a returning visitor is never
    // dropped into whatever they left behind last time
    localStorage: false,
    core: {
      weighted: false,
    },
    ui: {
      annotations: false,
    },
  });

  provideWelcomeScene(graph);

  graph.magic.componentSlots.addMany([
    {
      id: 'welcome-banner',
      component: WelcomeBanner,
      position: 'top-middle',
    },
    {
      id: 'action-bar',
      component: ActionBar,
      position: 'bottom-middle',
    },
  ]);
</script>

<template>
  <GraphProduct />
</template>
