import { afterEach, beforeEach, expect, it, vi } from 'vitest';

import {
  DISCREPANCY_CHECK_INTERVAL_MS,
  startGettersDiscrepancyAudit,
} from './getters-audit.ts';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

// mimics createGraph()'s real shape: getNode() always reads plugin-local state live,
// while getNodes() is a cache that only refreshes when something explicitly recomputes
// it — exactly the gap invalidateGetters() exists to close.
const createStaleableGraph = (label: { current: string }) => {
  let cachedNodes = [{ id: '1', label: label.current }];

  return {
    getNode: (id: string) => ({ id, label: label.current }),
    getEdge: (id: string) => ({ id }),
    getNodes: () => cachedNodes,
    getEdges: () => [] as { id: string }[],
    // simulates a correctly-behaving plugin's invalidateGetters() eventually resolving
    recompute: () => {
      cachedNodes = [{ id: '1', label: label.current }];
    },
  };
};

it('does not warn when nothing changed', () => {
  const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  const label = { current: 'a' };
  const graph = createStaleableGraph(label);

  const stop = startGettersDiscrepancyAudit(graph);
  vi.advanceTimersByTime(DISCREPANCY_CHECK_INTERVAL_MS);

  expect(errorSpy).not.toHaveBeenCalled();
  stop();
});

it('catches a discrepancy on its own clock, without anyone calling getNodes()/getEdges() first', () => {
  const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  const label = { current: 'a' };
  const graph = createStaleableGraph(label);

  const stop = startGettersDiscrepancyAudit(graph);

  // simulate a plugin mutating its local state without calling invalidateGetters() —
  // nothing here ever calls graph.getNodes()/getNode() from outside the audit itself
  label.current = 'b';
  vi.advanceTimersByTime(DISCREPANCY_CHECK_INTERVAL_MS);

  expect(errorSpy).toHaveBeenCalledTimes(1);
  expect(errorSpy.mock.calls[0][0]).toMatch(/getNodes\(\) is stale/);
  stop();
});

it('stops warning once the drift is resolved by an unrelated recompute', () => {
  const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  const label = { current: 'a' };
  const graph = createStaleableGraph(label);

  const stop = startGettersDiscrepancyAudit(graph);

  label.current = 'b';
  graph.recompute(); // e.g. some other plugin's invalidateGetters() flush
  vi.advanceTimersByTime(DISCREPANCY_CHECK_INTERVAL_MS);

  expect(errorSpy).not.toHaveBeenCalled();
  stop();
});

it('stops checking once the returned stop function is called', () => {
  const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  const label = { current: 'a' };
  const graph = createStaleableGraph(label);

  const stop = startGettersDiscrepancyAudit(graph);
  stop();

  label.current = 'b';
  vi.advanceTimersByTime(DISCREPANCY_CHECK_INTERVAL_MS * 3);

  expect(errorSpy).not.toHaveBeenCalled();
});
