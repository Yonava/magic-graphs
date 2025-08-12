import type { GEdge, GNode } from '@graph/types';

type ForceDirectedLayoutOptions = {
  width: number;
  height: number;
  iterations: number;
};

type PartialForceDirectedLayoutOptions = Partial<ForceDirectedLayoutOptions>;

const FORCE_DIRECTED_LAYOUT_OPTIONS_DEFAULTS = {
  iterations: 100,
  width: 1000,
  height: 1000,
} as const;

/**
 * Generates a layout for the given nodes using force-directed layout algorithm.
 * @param nodes The nodes to generate the layout for.
 * @param edges The edges to generate the layout for.
 * @param options The options for the layout algorithm.
 * @returns The layout for the given nodes.
 */
export const forceDirectedLayout = (
  nodes: GNode[],
  edges: GEdge[],
  options: PartialForceDirectedLayoutOptions = {},
) => {
  const { width, height, iterations } = {
    ...FORCE_DIRECTED_LAYOUT_OPTIONS_DEFAULTS,
    ...options,
  };

  const area = width * height;
  const k = Math.sqrt(area / nodes.length);
  let temperature = width / 10;

  const repulsiveForce = (distance: number) => (k * k) / distance;
  const attractiveForce = (distance: number) => (distance * distance) / k;

  for (let iter = 0; iter < iterations; iter++) {
    const displacements = new Map<string, { x: number; y: number }>();
    nodes.forEach((node) => displacements.set(node.id, { x: 0, y: 0 }));

    nodes.forEach((v) => {
      nodes.forEach((u) => {
        if (u.id !== v.id) {
          const dx = v.x - u.x;
          const dy = v.y - u.y;
          const distance = Math.sqrt(dx * dx + dy * dy) || 0.01;

          const force = repulsiveForce(distance);

          const disp = displacements.get(v.id)!;
          disp.x += (dx / distance) * force;
          disp.y += (dy / distance) * force;
        }
      });
    });

    edges.forEach((edge) => {
      const v = nodes.find((n) => n.id === edge.to)!;
      const u = nodes.find((n) => n.id === edge.from)!;

      const dx = v.x - u.x;
      const dy = v.y - u.y;
      const distance = Math.sqrt(dx * dx + dy * dy) || 0.01;
      const force = attractiveForce(distance);

      const vDisp = displacements.get(v.id)!;
      const uDisp = displacements.get(u.id)!;

      vDisp.x -= (dx / distance) * force;
      vDisp.y -= (dy / distance) * force;
      uDisp.x += (dx / distance) * force;
      uDisp.y += (dy / distance) * force;
    });

    nodes.forEach((v) => {
      const disp = displacements.get(v.id)!;
      const dispMagnitude =
        Math.sqrt(disp.x * disp.x + disp.y * disp.y) || 0.01;

      v.x += (disp.x / dispMagnitude) * Math.min(dispMagnitude, temperature);
      v.y += (disp.y / dispMagnitude) * Math.min(dispMagnitude, temperature);

      v.x = Math.min(width / 2, Math.max(-width / 2, v.x));
      v.y = Math.min(height / 2, Math.max(-height / 2, v.y));
    });

    temperature *= 0.9;
  }

  return nodes;
};
