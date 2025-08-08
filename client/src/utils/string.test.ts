import { describe, expect, test } from 'vitest';

import { camelCaseToTitleCase, capitalize } from './string';

describe('capitalize', () => {
  test('capitalizes the first letter of a string', () => {
    expect(capitalize('hello')).toBe('Hello');
    expect(capitalize('this is one string')).toBe('This is one string');
  });
});

describe('camelCaseToTitleCase', () => {
  test('converts camelCase to title case', () => {
    expect(camelCaseToTitleCase('camelCase')).toBe('Camel Case');
    expect(camelCaseToTitleCase('thisIsOneString')).toBe('This Is One String');
  });
});
