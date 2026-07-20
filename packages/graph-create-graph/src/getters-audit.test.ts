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

// mimics a getNode getter closing over plugin-local state, e.g. nodeLabel's
// nodeIdToLabel map
const createGetters = (label: { current: string }) => ({
  getNode: (id: string) => ({ id, label: label.current }),
  getEdge: (id: string) => ({ id }),
});

it('does not warn when nothing changed', () => {
  const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  const label = { current: 'a' };
  const getters = createGetters(label);
  const cache = {
    getNodes: () => [getters.getNode('1')],
    getEdges: () => [] as { id: string }[],
  };

  const stop = startGettersDiscrepancyAudit(
    { nodeIds: () => ['1'], edgeIds: () => [] },
    () => getters,
    cache,
  );

  vi.advanceTimersByTime(DISCREPANCY_CHECK_INTERVAL_MS);

  expect(errorSpy).not.toHaveBeenCalled();
  stop();
});

it('warns when a getter reads state that changed without invalidateGetters()', () => {
  const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  const label = { current: 'a' };
  const getters = createGetters(label);
  // the cache never gets recomputed here, so it stays frozen on the label at the
  // moment of capture — exactly what happens when a plugin forgets to invalidate
  const cachedNodes = [getters.getNode('1')];
  const cache = {
    getNodes: () => cachedNodes,
    getEdges: () => [] as { id: string }[],
  };

  const stop = startGettersDiscrepancyAudit(
    { nodeIds: () => ['1'], edgeIds: () => [] },
    () => getters,
    cache,
  );

  // simulate the plugin mutating its local state directly, without invalidateGetters()
  label.current = 'b';
  vi.advanceTimersByTime(DISCREPANCY_CHECK_INTERVAL_MS);

  expect(errorSpy).toHaveBeenCalledTimes(1);
  expect(errorSpy.mock.calls[0][0]).toMatch(/getNodes\(\) is stale/);
  stop();
});

it('stops checking once the returned stop function is called', () => {
  const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  const label = { current: 'a' };
  const getters = createGetters(label);
  const cachedNodes = [getters.getNode('1')];
  const cache = {
    getNodes: () => cachedNodes,
    getEdges: () => [] as { id: string }[],
  };

  const stop = startGettersDiscrepancyAudit(
    { nodeIds: () => ['1'], edgeIds: () => [] },
    () => getters,
    cache,
  );

  stop();
  label.current = 'b';
  vi.advanceTimersByTime(DISCREPANCY_CHECK_INTERVAL_MS * 3);

  expect(errorSpy).not.toHaveBeenCalled();
});
