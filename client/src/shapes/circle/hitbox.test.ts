import { describe, it, expect } from 'vitest';
import {
  circleHitbox,
  getCircleBoundingBox,
  circleEfficientHitbox,
} from '@shape/circle/hitbox';
import type { Coordinate } from '@shape/types';
import type { CircleSchema } from '@shape/circle';
import { circleTextHitbox } from '@shape/circle/text';

describe('circleHitbox', () => {
  const testCircle: CircleSchema = {
    at: { x: 50, y: 50 },
    radius: 20,
    stroke: { width: 4, color: 'black' },
  };

  const hitbox = circleHitbox(testCircle);

  it('should return true for a point clearly inside the circle', () => {
    const insidePoint: Coordinate = { x: 55, y: 55 };
    expect(hitbox(insidePoint)).toBe(true);
  });

  it('should return false for a point clearly outside the circle', () => {
    const outsidePoint: Coordinate = { x: 100, y: 100 };
    expect(hitbox(outsidePoint)).toBe(false);
  });

  it('should return true for a point very close to the edge (inside)', () => {
    const closeInsidePoint: Coordinate = { x: 69, y: 50 };
    expect(hitbox(closeInsidePoint)).toBe(true);
  });

  it('should return false for a point very close to the edge (outside)', () => {
    const closeOutsidePoint: Coordinate = { x: 72, y: 51 };
    expect(hitbox(closeOutsidePoint)).toBe(false);
  });
});

describe('getCircleBoundingBox', () => {
  const testCircle: CircleSchema = {
    at: { x: 50, y: 50 },
    radius: 20,
    stroke: { width: 4, color: 'black' },
  };

  it('should calculate the correct bounding box for the circle', () => {
    const boundingBox = getCircleBoundingBox(testCircle)();
    expect(boundingBox).toEqual({
      at: { x: 28, y: 28 },
      width: 44,
      height: 44,
    });
  });
});

describe('circleEfficientHitbox', () => {
  const testCircle: CircleSchema = {
    at: { x: 50, y: 50 },
    radius: 20,
    stroke: { width: 4, color: 'black' },
  };

  const efficientHitbox = circleEfficientHitbox(testCircle);

  it('should return true for a bounding box clearly overlapping the circle', () => {
    const overlappingBox = {
      at: { x: 40, y: 40 },
      width: 20,
      height: 20,
    };
    expect(efficientHitbox(overlappingBox)).toBe(true);
  });

  it('should return false for a bounding box clearly outside the circle', () => {
    const nonOverlappingBox = {
      at: { x: 80, y: 80 },
      width: 20,
      height: 20,
    };
    expect(efficientHitbox(nonOverlappingBox)).toBe(false);
  });

  it('should return true for a bounding box very close to the edge (overlapping)', () => {
    const closeOverlappingBox = {
      at: { x: 28, y: 28 },
      width: 22,
      height: 22,
    };
    expect(efficientHitbox(closeOverlappingBox)).toBe(true);
  });

  it('should return false for a bounding box very close to the edge (non-overlapping)', () => {
    const closeNonOverlappingBox = {
      at: { x: 72, y: 72 },
      width: 8,
      height: 8,
    };
    expect(efficientHitbox(closeNonOverlappingBox)).toBe(false);
  });
});

describe('circleTextHitbox', () => {
  const testCircle: CircleSchema = {
    at: { x: 50, y: 50 },
    radius: 20,
    textArea: {
      text: {
        content: '51',
        fontSize: 20,
      },
    },
  };

  const textHitbox = circleTextHitbox(testCircle);

  it('should return true for a point clearly inside the text hitbox', () => {
    const insidePoint: Coordinate = { x: 50, y: 50 };
    expect(textHitbox?.(insidePoint)).toBe(true);
  });

  it('should return false for a point clearly outside the text hitbox', () => {
    const outsidePoint: Coordinate = { x: 100, y: 100 };
    expect(textHitbox?.(outsidePoint)).toBe(false);
  });

  it('should return true for a point very close to the edge of the text hitbox (inside)', () => {
    const closeInsidePoint: Coordinate = { x: 70, y: 70 };
    expect(textHitbox?.(closeInsidePoint)).toBe(true);
  });

  it('should return false for a point very close to the edge of the text hitbox (outside)', () => {
    const closeOutsidePoint: Coordinate = { x: 71, y: 71 };
    expect(textHitbox?.(closeOutsidePoint)).toBe(false);
  });
});
