<script setup lang="ts">
  import Node from '@magic/shared/Node';
  import VStack from '@magic/shared/VStack';
  import Well from '@magic/shared/Well';

  import { computed, onUnmounted, ref, watch } from 'vue';

  import { useCurrentFrame } from './useCurrentFrame.ts';

  /** matches the .queue-item transition duration in the style block below + 250ms for a breather gap */
  const NODE_EXIT_MS = 200 + 250;

  const { currentFrame } = useCurrentFrame();

  const nodeIds = computed(() => currentFrame.value?.queuedNodeIds ?? []);

  const panelVisible = ref(nodeIds.value.length > 0);
  let hideTimeout: ReturnType<typeof setTimeout> | undefined;

  /*
    the panel outlives the last node by exactly one exit. tying it straight to
    emptiness unmounted the node along with its container, which killed the drop
    animation rather than delaying it: a leaving parent freezes its subtree, so
    the node never got the chance to fall out of the box it was falling out of
  */
  watch(nodeIds, (next) => {
    clearTimeout(hideTimeout);

    if (next.length > 0) {
      panelVisible.value = true;
      return;
    }

    hideTimeout = setTimeout(() => {
      panelVisible.value = false;
    }, NODE_EXIT_MS);
  });

  onUnmounted(() => clearTimeout(hideTimeout));

  const exitDirection = ref<'down' | 'up'>('down');
  const enterDirection = ref<'down' | 'up'>('down');

  /*
    neither end of the queue is fixed once the playhead can run backwards.
    playing forward, shift() takes the front and push() adds to the back, so
    nodes drop out the bottom and fall in from the top. scrubbing backwards
    undoes both: an undone enqueue takes the back, and an undone dequeue
    unshifts onto the front. a node has to enter and leave through the end it
    actually belongs to, or the animation claims the traversal did something it
    never did

    both directions are read off the diff rather than the playhead, so a jump
    across several frames still resolves to the end that actually changed. sync
    flush lands them before the patch that starts the transitions
  */
  watch(
    nodeIds,
    (next, previous) => {
      const before = previous ?? [];

      const frontLeft = before[0] !== undefined && !next.includes(before[0]);
      exitDirection.value = frontLeft ? 'down' : 'up';

      /*
        an unshift belongs to the bottom of the column, which is where it will
        sit. arriving from below means the nodes already in line get pushed up
        ahead of it rather than shoved aside by something falling past them
      */
      const frontGained = next[0] !== undefined && !before.includes(next[0]);
      enterDirection.value = frontGained ? 'up' : 'down';
    },
    { flush: 'sync' },
  );
</script>

<template>
  <!--
    an empty queue has nothing to say, so the whole panel leaves rather than
    sitting there as an empty box. it lives on the right edge, so it slides out
    past that edge: the panel comes from the side it is anchored to
  -->
  <Transition
    name="panel"
    appear
  >
    <Well
      v-if="panelVisible"
      class="queue-panel"
    >
      <!--
        the box is fixed rather than sized to the contents, so the panel holds
        still while the queue drains and fills. a container that resized every
        frame would move the nodes around for reasons that have nothing to do
        with the traversal
      -->
      <VStack class="queue-box gap-2 items-center w-18">
        <!--
          keying each item by node id is what makes the animation smart: vue
          matches the ids across frames, so a shift() is a leave and everything
          behind it gets a FLIP move down. nothing here diffs the array by hand

          the column is reversed, so index 0 (the front) sits at the bottom and
          the scroller stays anchored there as the back grows past the cap
        -->
        <TransitionGroup
          name="queue"
          tag="div"
          appear
          class="relative flex flex-col-reverse items-center gap-2 h-full w-full overflow-y-auto"
          :class="[
            exitDirection === 'down' ? 'exit-down' : 'exit-up',
            enterDirection === 'down' ? 'enter-down' : 'enter-up',
          ]"
        >
          <Node
            v-for="nodeId in nodeIds"
            :key="nodeId"
            :id="nodeId"
            class="queue-item shrink-0"
          />
        </TransitionGroup>
      </VStack>
    </Well>
  </Transition>
</template>

<style scoped>
  /*
    the appear classes matter as much as the enter ones: the lens mounts with
    the start node already queued, so the panel's first showing is an initial
    render, which vue leaves unanimated unless asked

    the slide duration is a variable because the first node's drop waits on it.
    the nodes inherit it from the panel they sit in, so the two cannot drift
  */
  .queue-panel {
    --panel-slide: 250ms;
  }

  .panel-enter-active,
  .panel-appear-active,
  .panel-leave-active {
    transition: transform var(--panel-slide) cubic-bezier(0.34, 1.4, 0.64, 1);
  }

  /*
    the slot sits 1.5rem in from the right edge, so clearing the panel's own
    width is not enough to get it off screen. the inset has to go too
  */
  .panel-enter-from,
  .panel-appear-from,
  .panel-leave-to {
    transform: translateX(calc(100% + 1.5rem));
  }

  .queue-item {
    transition: transform 200ms ease;
  }

  /*
    the column height is a variable rather than a utility class because the
    entrance is measured against it: a node starts one full column above its
    slot, which puts it past the top edge no matter how deep the stack is, and
    the well's clipping hides it until it drops into view. offsetting by the
    node's own height instead would start it mid box on a short queue, since
    that offset is relative to the node rather than to the container
  */
  .queue-box {
    --column-height: 50vh;
    height: var(--column-height);
  }

  .enter-down .queue-enter-from {
    transform: translateY(calc(-1 * var(--column-height)));
  }

  /* the same column-length offset from below, for a node unshifted onto the
     front. it rises through the bottom edge, retracing the drop it undoes */
  .enter-up .queue-enter-from {
    transform: translateY(var(--column-height));
  }

  /* the drop covers more ground than a shuffle, so it gets longer to do it */
  .queue-enter-active,
  .queue-appear-active {
    transition-duration: 300ms;
    transition-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  /*
    the node that brings the panel back with it mounts alongside the panel, so
    without an appear it would ride in already seated. it always falls from the
    top, since a queue coming back from empty is being pushed to, and it waits
    out the panel's own slide first so it lands in a box that has stopped moving
  */
  .queue-appear-from {
    transform: translateY(calc(-1 * var(--column-height)));
  }

  .queue-appear-active {
    transition-delay: var(--panel-slide);
  }

  /*
    a leaving node is pulled out of flow so the line closes into the gap during
    the exit rather than after it. it anchors to whichever edge it is leaving
    through, since that is the position it held before it was pulled out
  */
  .queue-leave-active {
    position: absolute;
  }

  .exit-down .queue-leave-active {
    bottom: 0;
  }

  .exit-down .queue-leave-to {
    transform: translateY(120%);
  }

  .exit-up .queue-leave-active {
    top: 0;
  }

  .exit-up .queue-leave-to {
    transform: translateY(-120%);
  }
</style>
