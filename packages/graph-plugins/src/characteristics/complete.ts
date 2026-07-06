import { Controls } from './index.ts';

export const isComplete = (controls: Controls) => {
  const isDirected = controls.metadata.directed;
  const n = controls.nodes.length;
  const m = controls.edges.length;
  return m === (isDirected ? n * (n - 1) : (n * (n - 1)) / 2);
};
