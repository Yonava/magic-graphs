import {
  GettersAuditGraph,
  startGettersDiscrepancyAudit,
} from '@graph/dev-tools/debugging/getters-audit';

import { onBeforeUnmount, onMounted } from 'vue';

export const useGraphDevTools = (graph: GettersAuditGraph) => {
  // @ts-expect-error add vite env to .d.ts
  if (!import.meta.env.DEV) return;
  let cleanup: () => void;
  onMounted(() => {
    cleanup = startGettersDiscrepancyAudit(graph);
  });
  onBeforeUnmount(() => {
    cleanup?.();
  });
};
