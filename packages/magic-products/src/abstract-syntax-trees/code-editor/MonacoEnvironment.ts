// Define the environment hooks for Monaco's web workers
window.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') {
      return new Worker(
        new URL(
          'monaco-editor/esm/vs/language/json/json.worker.js',
          import.meta.url,
        ),
        { type: 'module' },
      );
    }
    if (label === 'css' || label === 'less' || label === 'scss') {
      return new Worker(
        new URL(
          'monaco-editor/esm/vs/language/css/css.worker.js',
          import.meta.url,
        ),
        { type: 'module' },
      );
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new Worker(
        new URL(
          'monaco-editor/esm/vs/language/html/html.worker.js',
          import.meta.url,
        ),
        { type: 'module' },
      );
    }
    if (label === 'typescript' || label === 'javascript') {
      return new Worker(
        new URL(
          'monaco-editor/esm/vs/language/typescript/ts.worker.js',
          import.meta.url,
        ),
        { type: 'module' },
      );
    }
    // Default fallback editor worker
    return new Worker(
      new URL('monaco-editor/esm/vs/editor/editor.worker.js', import.meta.url),
      { type: 'module' },
    );
  },
};
