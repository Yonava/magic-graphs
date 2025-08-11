import { expect, test } from 'vitest';

import { clone } from './clone';
import { delta } from './deepDelta';

test('works on basic objects', () => {
  const obj = { a: 1, b: 2 };
  const cloned = clone(obj);
  expect(cloned).not.toBe(obj);
  expect(cloned).toEqual(obj);
});

test('works on nested objects', () => {
  const obj = { a: { b: 1 } };
  const cloned = clone(obj);
  expect(cloned).not.toBe(obj);
  expect(cloned).toEqual(obj);
});

test('works by preserving nested references', () => {
  const objWithRef = { a: { b: () => { } }, c: { d: 1 } } as any;
  const cloned = clone(objWithRef);
  objWithRef.c = {};
  expect(cloned.a.b).toBe(objWithRef.a.b);
  expect(cloned.c).toEqual({ d: 1 });
});

test('works with deep delta', () => {
  const nodeSize = (node: any) => node.size;
  const nodeBorderWidth = (node: any) => node.borderWidth;
  const storedTheme = clone({
    nodeSize,
    nodeBorderWidth,
    nodeBorderColor: '#000',
    edgeWidth: 1,
    edgeColor: '#123',
  });
  const incomingTheme = {
    nodeSize,
    nodeBorderWidth,
    nodeBorderColor: '#000',
    edgeWidth: 1,
    edgeColor: '#123',
  };
  const diff = delta(storedTheme, incomingTheme);
  expect(diff).toEqual(null);
});
