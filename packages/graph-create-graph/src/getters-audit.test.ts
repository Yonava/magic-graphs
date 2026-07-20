import { afterEach, beforeEach, expect, it, vi } from 'vitest';

import {
  createGettersAuditTrigger,
  DISCREPANCY_CHECK_INTERVAL_MS,
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

  const triggerAudit = createGettersAuditTrigger(
    { nodeIds: () => ['1'], edgeIds: () => [] },
    () => getters,
    cache,
  );

  triggerAudit();
  vi.runAllTimers();

  expect(errorSpy).not.toHaveBeenCalled();
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

  const triggerAudit = createGettersAuditTrigger(
    { nodeIds: () => ['1'], edgeIds: () => [] },
    () => getters,
    cache,
  );

  // simulate the plugin mutating its local state directly, without invalidateGetters(),
  // then a consumer reading getNodes()/getEdges() — that read is what triggers a check
  label.current = 'b';
  triggerAudit();
  vi.runAllTimers();

  expect(errorSpy).toHaveBeenCalledTimes(1);
  expect(errorSpy.mock.calls[0][0]).toMatch(/getNodes\(\) is stale/);
});

it('throttles: repeated calls within the interval only check once', () => {
  const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  const label = { current: 'a' };
  const getters = createGetters(label);
  const cachedNodes = [getters.getNode('1')];
  const cache = {
    getNodes: () => cachedNodes,
    getEdges: () => [] as { id: string }[],
  };

  const triggerAudit = createGettersAuditTrigger(
    { nodeIds: () => ['1'], edgeIds: () => [] },
    () => getters,
    cache,
  );

  label.current = 'b';
  triggerAudit();
  triggerAudit();
  triggerAudit();
  vi.runAllTimers();

  expect(errorSpy).toHaveBeenCalledTimes(1);

  // a second state change, but well within the throttle window — no new check yet
  label.current = 'c';
  triggerAudit();
  vi.advanceTimersByTime(DISCREPANCY_CHECK_INTERVAL_MS / 2);

  expect(errorSpy).toHaveBeenCalledTimes(1);

  // once the window has fully elapsed, the next call checks again
  vi.advanceTimersByTime(DISCREPANCY_CHECK_INTERVAL_MS);
  triggerAudit();
  vi.runAllTimers();

  expect(errorSpy).toHaveBeenCalledTimes(2);
});

it('never calls getNodes()/getEdges() on the passed-in cache before it is due — no work happens without a caller', () => {
  const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  const getNodes = vi.fn(() => []);
  const getEdges = vi.fn(() => []);

  createGettersAuditTrigger(
    { nodeIds: () => [], edgeIds: () => [] },
    () => ({ getNode: () => ({ id: '1' }), getEdge: () => ({ id: '1' }) }),
    { getNodes, getEdges },
  );

  vi.advanceTimersByTime(DISCREPANCY_CHECK_INTERVAL_MS * 10);

  expect(getNodes).not.toHaveBeenCalled();
  expect(getEdges).not.toHaveBeenCalled();
  expect(errorSpy).not.toHaveBeenCalled();
});
