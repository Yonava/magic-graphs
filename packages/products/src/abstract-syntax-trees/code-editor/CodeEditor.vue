<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
// Use the core ESM main entry point to ensure language namespaces are registered
import * as monaco from 'monaco-editor/esm/vs/editor/editor.main.js'
import './MonacoEnvironment'

const model = defineModel<string>()

const editorContainer = ref<HTMLDivElement | null>(null)
let editor: monaco.editor.IStandaloneCodeEditor | null = null;

const configureTypeScriptDefaults = () => {
  const ts = monaco.languages.typescript;
  // @ts-expect-error holding until monaco-editor v0.56
  const compilerOptions: monaco.languages.typescript.CompilerOptions = {
    allowNonTsExtensions: true,
    // @ts-expect-error holding until monaco-editor v0.56
    module: ts.ModuleKind.ESNext,
    strict: true,
    // @ts-expect-error holding until monaco-editor v0.56
    target: ts.ScriptTarget.ESNext,
  };
  // @ts-expect-error holding until monaco-editor v0.56
  ts.typescriptDefaults.setCompilerOptions(compilerOptions);
};

onMounted(() => {
  if (!editorContainer.value) return;

  // Run global language configuration before creating instances
  configureTypeScriptDefaults()

  editor = monaco.editor.create(editorContainer.value, {
    value: model.value,
    language: 'typescript',
    theme: 'light',
    automaticLayout: true,
    minimap: { enabled: false },
  });

  editor.onDidChangeModelContent(() => {
    const value = editor?.getValue() ?? '';
    model.value = value;
  });
});

onBeforeUnmount(() => {
  if (editor) {
    editor.dispose();
  }
});
</script>

<template>
  <div ref="editorContainer" class="editor-viewport" @keydown.stop />
</template>

<style scoped>
.editor-viewport {
  width: 100vw;
  height: 100vh;
}
</style>