import fc from 'fast-check';
import { expect, it } from 'vitest';

import {
  disconnectedGraphArbitrary,
  graphArbitrary,
} from './graphGenerator.ts';
import { kruskals } from './kruskals/index.ts';
import { prims } from './prims/index.ts';

it('kruskals and prims agree on total weight and connectivity', () => {
  fc.assert(
    fc.property(graphArbitrary, ({ nodes, edges }) => {
      const kruskalsResult = kruskals(nodes, edges);
      const primsResult = prims(nodes, edges);

      expect(kruskalsResult.totalWeight.equals(primsResult.totalWeight)).toBe(
        true,
      );
      expect(kruskalsResult.connected).toBe(primsResult.connected);
      expect(kruskalsResult.edges.length).toBe(primsResult.edges.length);
    }),
    { numRuns: 10 },
  );
});

it('kruskals and prims agree on disconnected graphs too', () => {
  fc.assert(
    fc.property(disconnectedGraphArbitrary, ({ nodes, edges }) => {
      const kruskalsResult = kruskals(nodes, edges);
      const primsResult = prims(nodes, edges);

      expect(kruskalsResult.totalWeight.equals(primsResult.totalWeight)).toBe(
        true,
      );
      expect(kruskalsResult.connected).toBe(primsResult.connected);
      expect(kruskalsResult.edges.length).toBe(primsResult.edges.length);
    }),
    { numRuns: 10 },
  );
});
