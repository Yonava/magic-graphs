<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { nonNullGraph as graph } from '@graph/global';
  import { collabControls, myCollaboratorProfile } from '@graph/collab';
  import { debounce } from '@utils/debounce';
  import colors from '@utils/colors';
  import { productIdToProduct, useProductRouting } from '@utils/product';
  import { generateId } from '@utils/id';
  import GraphSandboxProductInfo from '../info';
  import CPopover from '@ui/core/Popover.vue';
  import GButton from '@ui/graph/button/GButton.vue';
  import CButton from '@ui/core/button/Button.vue';
  import CIcon from '@ui/core/Icon.vue';
  import GWell from '@ui/graph/GWell.vue';
  import GInputText from '@ui/graph/input/GInputText.vue';

  const router = useRouter();
  const { navigate } = useProductRouting();

  const {
    connectToRoom,
    isConnected,
    connectedRoomId,
    disconnectFromRoom,
    collaborators,
    collaboratorCount,
    meAsACollaborator,
  } = collabControls;

  const link = computed(() => {
    return `${window.location.origin}?rid=${connectedRoomId.value}`;
  });

  const linkCopied = ref(false);
  const resetLinkCopied = debounce(() => {
    linkCopied.value = false;
  }, 2000);

  const startingRoom = ref(false);

  const copyLink = () => {
    try {
      navigator.clipboard.writeText(link.value);
      linkCopied.value = true;
      resetLinkCopied();
    } catch (e) {
      console.error('Failed to copy link to clipboard', e);
    }
  };

  const startCollaboration = async () => {
    startingRoom.value = true;

    await connectToRoom({
      roomId: generateId(),
      productId: GraphSandboxProductInfo.productId,
      graph: graph.value,
    });

    router.push({ query: { rid: connectedRoomId.value } });
    startingRoom.value = false;
  };

  const stopCollaboration = () => {
    disconnectFromRoom();
    router.push({ query: { rid: undefined } });
  };
</script>

<template>
  <CPopover>
    <template #activator="props">
      <slot v-bind="props"></slot>
    </template>

    <GWell class="flex flex-col p-3 w-[400px] rounded-lg">
      <h1 class="text-2xl font-bold mb-3">Collaborate</h1>

      <h2 class="text-xl font-bold mb-2">My Name</h2>
      <div class="rounded-lg mb-2">
        <GInputText
          v-model="myCollaboratorProfile.name"
          id="collab-name"
          :disabled="isConnected || startingRoom"
          class="w-full"
          placeholder="Pick a name for others to see"
        />
      </div>

      <div class="w-full mt-2">
        <GButton
          v-if="!isConnected && !startingRoom"
          @click="startCollaboration"
          contrast
          :disabled="!myCollaboratorProfile.name"
          class="w-full"
        >
          Generate Link
          <CIcon
            icon="link"
            class="ml-2"
          />
        </GButton>

        <CButton
          v-else-if="startingRoom"
          disabled
          class="w-full"
        >
          Preparing Room...
        </CButton>

        <div v-else>
          <GWell
            @click="copyLink"
            tertiary
            class="group p-2 rounded-md cursor-pointer flex justify-between items-center"
          >
            <span>
              {{ link }}
            </span>
            <CIcon
              v-if="!linkCopied"
              icon="content-copy"
              class="group-hover:opacity-100 opacity-0"
            />
            <CIcon
              v-if="linkCopied"
              icon="check"
              class="text-green-400"
            />
          </GWell>
        </div>
      </div>

      <div
        v-if="isConnected"
        class="mt-4 w-full"
      >
        <CButton
          @click="stopCollaboration"
          :color="colors.RED_600"
          class="w-full"
        >
          Disconnect
        </CButton>
      </div>

      <div v-if="isConnected && meAsACollaborator">
        <h2 class="text-xl font-bold mt-4 mb-2">
          Collaborators ({{ collaboratorCount }})
        </h2>
        <div class="flex flex-wrap items-center gap-2">
          <div
            v-tooltip.bottom="{
              value: `You are in ${
                productIdToProduct[meAsACollaborator.productId].name
              }`,
              pt: {
                text: 'bg-magic',
              },
            }"
            :style="{ backgroundColor: meAsACollaborator.color }"
            class="text-gray-300 font-bold rounded-md px-3 py-1"
          >
            {{ meAsACollaborator.name }} (You)
          </div>
          <button
            v-for="collaborator in collaborators"
            :key="collaborator.id"
            @click="navigate(productIdToProduct[collaborator.productId])"
            v-tooltip="
              `${collaborator.name} is in ${
                productIdToProduct[collaborator.productId].name
              }`
            "
            :style="{ backgroundColor: collaborator.color }"
            class="text-gray-300 font-bold rounded-md px-3 py-1"
          >
            {{ collaborator.name }}
          </button>
        </div>
      </div>
    </GWell>
  </CPopover>
</template>
