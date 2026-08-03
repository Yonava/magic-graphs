import { dijkstra } from './index.ts';
import { describe, it, expect } from 'vitest';
import Fraction from 'fraction.js';

describe(dijkstra, () => {
  it('should throw an error for a negative edge weight', () => {
    const nodes = [
      { id: 'A' },
      { id: 'B' },
    ];

    const edges = [
      { id: 'edge1', source: 'A', target: 'B', weight: new Fraction(-1) },
    ];

    expect(() => dijkstra(nodes, edges, 'A')).toThrowError(
      'Edge "edge1" has a negative weight. Dijkstra\'s algorithm requires non-negative edge weights.'
    );
  });
  it('should throw an error for an unknown start node', () => {
    const nodes = [
      { id: 'A' },
      { id: 'B' },
    ];

    const edges = [
      { id: 'edge1', source: 'A', target: 'B', weight: new Fraction(1) },
    ];

    expect(() => dijkstra(nodes, edges, 'C')).toThrowError(
      'Unknown start node "C".'
    );
  });
  it('should throw an error for an edge with an unknown source node', () => {
    const nodes = [
      { id: 'A' },
      { id: 'B' },
    ];

    const edges = [
      { id: 'edge1', source: 'C', target: 'B', weight: new Fraction(1) },
    ];

    expect(() => dijkstra(nodes, edges, 'A')).toThrowError(
      'Edge "edge1" references unknown source "C".'
    );
  });
  it('should find the shortest path in a simple graph', () => {
    const nodes = [
      { id: 'A' },
      { id: 'B' },
      { id: 'C' },
    ];

    const edges = [
      { id: 'edge1', source: 'A', target: 'B', weight: new Fraction(1) },
      { id: 'edge2', source: 'B', target: 'C', weight: new Fraction(2) },
      { id: 'edge3', source: 'A', target: 'C', weight: new Fraction(4) },
    ];

    const result = dijkstra(nodes, edges, 'A');

    expect(result.distances.get('A')?.equals(new Fraction(0))).toBe(true);
    expect(result.distances.get('B')?.equals(new Fraction(1))).toBe(true);
    expect(result.distances.get('C')?.equals(new Fraction(3))).toBe(true);

    expect(result.previous.get('A')).toBe(null);
    expect(result.previous.get('B')).toBe('A');
    expect(result.previous.get('C')).toBe('B');

    expect(result.connected).toBe(true);
  });
});