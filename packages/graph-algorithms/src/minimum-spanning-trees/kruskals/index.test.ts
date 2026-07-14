import { describe, expect, it } from "vitest";
import kruskals from "./index.ts";

type Node = {
  id: string;
};

type Edge = {
  id: string;
  source: string;
  target: string;
  weight: number;
};

describe("kruskals", () => {
  it("finds the minimum spanning tree of a simple graph", () => {
    const nodes: Node[] = [
      { id: "A" },
      { id: "B" },
      { id: "C" },
      { id: "D" },
    ];

    const edges: Edge[] = [
      { id: "AB", source: "A", target: "B", weight: 1 },
      { id: "AC", source: "A", target: "C", weight: 4 },
      { id: "BC", source: "B", target: "C", weight: 2 },
      { id: "BD", source: "B", target: "D", weight: 5 },
      { id: "CD", source: "C", target: "D", weight: 3 },
    ];

    const result = kruskals(nodes, edges);

    expect(result.edges.map(e => e.id)).toEqual([
      "AB",
      "BC",
      "CD",
    ]);

    expect(result.totalWeight).toBe(6);
  });


  it("does not include cycles", () => {
    const nodes: Node[] = [
      { id: "A" },
      { id: "B" },
      { id: "C" },
    ];

    const edges: Edge[] = [
      { id: "AB", source: "A", target: "B", weight: 1 },
      { id: "BC", source: "B", target: "C", weight: 2 },
      { id: "AC", source: "A", target: "C", weight: 3 },
    ];

    const result = kruskals(nodes, edges);

    expect(result.edges).toHaveLength(2);
    expect(result.totalWeight).toBe(3);
  });


  it("handles a graph where edges are not sorted", () => {
    const nodes: Node[] = [
      { id: "A" },
      { id: "B" },
      { id: "C" },
    ];

    const edges: Edge[] = [
      { id: "AC", source: "A", target: "C", weight: 10 },
      { id: "BC", source: "B", target: "C", weight: 1 },
      { id: "AB", source: "A", target: "B", weight: 5 },
    ];

    const result = kruskals(nodes, edges);

    expect(result.edges.map(e => e.id)).toEqual([
      "BC",
      "AB",
    ]);

    expect(result.totalWeight).toBe(6);
  });


  it("handles a single node graph", () => {
    const nodes: Node[] = [
      { id: "A" },
    ];

    const result = kruskals(nodes, []);

    expect(result.edges).toEqual([]);
    expect(result.totalWeight).toBe(0);
  });


  it("handles a disconnected graph as a minimum spanning forest", () => {
    const nodes: Node[] = [
      { id: "A" },
      { id: "B" },
      { id: "C" },
      { id: "D" },
    ];

    const edges: Edge[] = [
      { id: "AB", source: "A", target: "B", weight: 1 },
      { id: "CD", source: "C", target: "D", weight: 2 },
    ];

    const result = kruskals(nodes, edges);

    expect(result.edges.map(e => e.id)).toEqual([
      "AB",
      "CD",
    ]);

    expect(result.totalWeight).toBe(3);
  });


  it("handles equal weight edges", () => {
    const nodes: Node[] = [
      { id: "A" },
      { id: "B" },
      { id: "C" },
    ];

    const edges: Edge[] = [
      { id: "AB", source: "A", target: "B", weight: 1 },
      { id: "BC", source: "B", target: "C", weight: 1 },
      { id: "AC", source: "A", target: "C", weight: 1 },
    ];

    const result = kruskals(nodes, edges);

    expect(result.edges).toHaveLength(2);
    expect(result.totalWeight).toBe(2);
  });
});