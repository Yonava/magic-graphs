<script setup lang="ts">
  import { ref, computed, watch, unref, onBeforeUnmount } from 'vue';
  import { useLocalStorage } from '@vueuse/core';
  import { useAdjacencyList } from '@graph/useAdjacencyList';
  import { useGraph } from '@graph/useGraph';
  import type { Trace } from './types';
  import { algos } from './algos';
  import CodeEditor from './components/CodeEditor.vue';
  import TraceOutput from './components/TraceOutput.vue';
  import Graph from '@graph/MagicGraph.vue';

  /** Trace or undefined for loading state */
  const trace = ref<Trace | undefined>(undefined);

  const graphEl = ref<HTMLCanvasElement>();

  const graph = useGraph(graphEl, {
    persistentStorageKey: 'search-visualizer-graph',
  });

  const { labelAdjacencyList } = useAdjacencyList(graph);

  const argName = 'graph';
  const userFuncSig = `function traverse(${argName}) { // 🔒`;

  const getDecoratedAlgorithm = (algo: string) =>
    `${userFuncSig}\n  ${algo}\n}`;

  /**
   * the code that the user interacts with, including "decorations" like the function signature
   * and closing brackets
   */
  const decoratedAlgorithm = useLocalStorage(
    'userFn',
    getDecoratedAlgorithm(algos.BFS),
  );

  /**
   * extracts the runnable algorithm code from the decoration code
   */
  const algorithm = computed(() =>
    decoratedAlgorithm.value.split('\n').slice(1, -1).join('\n'),
  );

  /**
   * stores any errors that occur during algorithm execution.
   * User facing, so it should be a legible string
   */
  const algorithmError = ref('');

  interface MessageToWorker {
    graphData: string;
    algorithmCode: string;
    argName: string;
  }

  type MessageFromWorker =
    | { type: 'success'; trace: Trace }
    | { type: 'error'; message: string };

  function createWorkerFunction() {
    return function (e: MessageEvent<MessageToWorker>) {
      const postError = (error: unknown, prefix?: string) => {
        const message =
          error instanceof Error
            ? `${error.name}: ${error.message}`
            : 'Unknown error';
        self.postMessage({
          type: 'error',
          message: (prefix ?? '') + message,
        } satisfies MessageFromWorker);
      };
      try {
        const { graphData, algorithmCode, argName } = e.data;
        const graph = JSON.parse(graphData);
        const trace: Trace = [];

        const trappedGraph = new Proxy(graph, {
          get(target, prop, receiver) {
            trace.push(prop.toString());
            if (trace.length > 100) throw new Error('Infinite loop detected');
            if (!Reflect.has(target, prop))
              throw new Error(`Node "${prop.toString()}" not found in graph`);
            return Reflect.get(target, prop, receiver);
          },
        });

        let traverse;
        try {
          traverse = new Function(argName, algorithmCode);
        } catch (e) {
          postError(e, 'Error interpreting code: ');
          return;
        }

        try {
          traverse(trappedGraph);
          self.postMessage({
            type: 'success',
            trace,
          } satisfies MessageFromWorker);
        } catch (e) {
          postError(e);
        }
      } catch (e) {
        postError(e);
      }
    }.toString();
  }

  const currentWorker = ref<Worker | null>(null);
  const workerTimeoutId = ref<number | undefined>(undefined);

  function cleanupWorker() {
    if (workerTimeoutId.value) {
      clearTimeout(workerTimeoutId.value);
      workerTimeoutId.value = undefined;
    }
    if (currentWorker.value) {
      currentWorker.value.terminate();
      currentWorker.value = null;
    }
  }

  /**
   * runs the algorithm on the graph and collects the traversal trace + any errors
   */
  const runAlgorithm = () => {
    cleanupWorker();

    algorithmError.value = '';
    trace.value = undefined;

    const workerCode = `self.onmessage = (${createWorkerFunction()})`;
    const blob = new Blob([workerCode], { type: 'application/javascript' });
    const worker = new Worker(URL.createObjectURL(blob), { type: 'module' });

    currentWorker.value = worker;

    worker.postMessage({
      graphData: JSON.stringify(unref(labelAdjacencyList.value)),
      algorithmCode: algorithm.value,
      argName,
    } satisfies MessageToWorker);

    workerTimeoutId.value = window.setTimeout(() => {
      algorithmError.value =
        'Timeout: Algorithm took longer than 5 seconds to execute';
      cleanupWorker();
    }, 5000);

    worker.onmessage = function (e: MessageEvent<MessageFromWorker>) {
      switch (e.data.type) {
        case 'success':
          trace.value = e.data.trace;
          break;
        case 'error':
          algorithmError.value = e.data.message || 'An unknown error occurred';
          break;
      }

      cleanupWorker();
    };

    // This error event has nothing useful at least in Firefox
    worker.onerror = function () {
      algorithmError.value = 'Unknown error in web worker';
      cleanupWorker();
    };

    worker.onmessageerror = function () {
      algorithmError.value = 'Worker message error occurred';
      cleanupWorker();
    };
  };

  let debounceTimeout: number | null = null;

  watch(decoratedAlgorithm, () => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    debounceTimeout = window.setTimeout(() => {
      runAlgorithm();
    }, 300);
  });

  onBeforeUnmount(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    cleanupWorker();
  });

  watch(labelAdjacencyList, runAlgorithm);
</script>

<template>
  <div class="w-full h-full relative">
    <!-- graph -->
    <div class="h-[50%] relative">
      <Graph
        @graph-ref="(el) => (graphEl = el)"
        :graph="graph"
      />
      <!-- switch out algorithm -->
      <div
        :class="[
          'absolute',
          'bottom-0',
          'h-[5%]',
          'flex',
          'items-center',
          'gap-3',
          'pb-7',
          'pl-3',
          'select-none',
        ]"
      >
        <button
          v-for="(algo, algoName) in algos"
          :key="algoName"
          @click="decoratedAlgorithm = getDecoratedAlgorithm(algo)"
          :class="[
            'text-white',
            'bg-gray-800',
            'px-5',
            'py-1',
            'font-bold',
            'text-md',
            'rounded-full',
            'hover:bg-gray-900',
            'focus:bg-gray-900',
          ]"
        >
          {{ algoName }}
        </button>
      </div>
    </div>

    <!-- code editor -->
    <div class="h-[45%] text-lg">
      <CodeEditor v-model="decoratedAlgorithm" />
    </div>

    <!-- traversal trace output -->
    <div class="absolute bottom-0 h-[10%] w-full">
      <TraceOutput
        :trace="trace"
        :error="algorithmError"
      />
    </div>
  </div>
</template>
