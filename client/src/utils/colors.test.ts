import { describe, expect, test } from 'vitest';

test('true is true', () => {
  expect(true).toBe(true);
});

// import {
//   isHex,
//   isHexAlpha,
//   isHexStandard,
//   isHsl,
//   isHslAlpha,
//   isHslStandard,
//   isRgb,
//   isRgbAlpha,
//   isRgbStandard
// } from './colors'

// describe('isHex', () => {
//   test('returns true if a string is a valid hex color', () => {
//     expect(isHex('#000000')).toBe(true)
//     expect(isHex('#ffffff')).toBe(true)
//     expect(isHex('#F0F0F0')).toBe(true)
//     expect(isHex('#abcdef00')).toBe(true) // with alpha
//   })

//   test('returns false if a string is not a valid hex color', () => {
//     expect(isHex('#0000gg')).toBe(false) // invalid character
//     expect(isHex('#0000000')).toBe(false) // too many characters
//     expect(isHex('#F0F0F')).toBe(false) // too few characters
//   })
// })

// describe('isHexAlpha', () => {
//   test('returns true if a string is a valid hex color with alpha', () => {
//     expect(isHexAlpha('#00000000')).toBe(true)
//     expect(isHexAlpha('#ffffffff')).toBe(true)
//     expect(isHexAlpha('#F0F0F0FF')).toBe(true)
//   })

//   test('returns false if a string is not a valid hex color with alpha', () => {
//     expect(isHexAlpha('#0000000')).toBe(false) // too few characters
//     expect(isHexAlpha('#F0F0F0')).toBe(false) // too few characters
//     expect(isHexAlpha('#00000000g')).toBe(false) // invalid character
//   })
// })

// describe('isHexStandard', () => {
//   test('returns true if a string is a valid hex color without alpha', () => {
//     expect(isHexStandard('#000000')).toBe(true)
//     expect(isHexStandard('#ffffff')).toBe(true)
//     expect(isHexStandard('#F0F0F0')).toBe(true)
//   })

//   test('returns false if a string is not a valid hex color without alpha', () => {
//     expect(isHexStandard('#0000000')).toBe(false) // too many characters
//     expect(isHexStandard('#F0F0F')).toBe(false) // too few characters
//     expect(isHexStandard('#00000000')).toBe(false) // too many characters
//   })
// })

// describe('isHsl', () => {
//   test('returns true if a string is a valid hsl color', () => {
//     expect(isHsl('hsl(0, 0%, 0%)')).toBe(true)
//     expect(isHsl('hsl(360, 100%, 100%)')).toBe(true)
//     expect(isHsl('hsl(180, 50%, 50%)')).toBe(true)
//     expect(isHsl('hsla(0, 0%, 0%, 0)')).toBe(true) // with alpha
//   })

//   test('returns false if a string is not a valid hsl color', () => {
//     expect(isHsl('hsl(0, 0%, 0)')).toBe(false) // missing closing parenthesis
//     expect(isHsl('hsl(360, 100%, 100%)0')).toBe(false) // extra characters
//     expect(isHsl('hsl(360, 100%, 100%)%')).toBe(false) // invalid character
//   })
// })

// describe('isHslAlpha', () => {
//   test('returns true if a string is a valid hsl color with alpha', () => {
//     expect(isHslAlpha('hsla(0, 0%, 0%, 0)')).toBe(true)
//     expect(isHslAlpha('hsla(360, 100%, 100%, 1)')).toBe(true)
//     expect(isHslAlpha('hsla(180, 50%, 50%, 0.5)')).toBe(true)
//   })

//   test('returns false if a string is not a valid hsl color with alpha', () => {
//     expect(isHslAlpha('hsla(0, 0%, 0%)')).toBe(false) // missing alpha value
//     expect(isHslAlpha('hsla(360, 100%, 100%, 1)0')).toBe(false) // extra characters
//     expect(isHslAlpha('hsla(360, 100%, 100%, 1)%')).toBe(false) // invalid character
//   })
// })

// describe('isHslStandard', () => {
//   test('returns true if a string is a valid hsl color without alpha', () => {
//     expect(isHslStandard('hsl(0, 0%, 0%)')).toBe(true)
//     expect(isHslStandard('hsl(360, 100%, 100%)')).toBe(true)
//     expect(isHslStandard('hsl(180, 50%, 50%)')).toBe(true)
//   })

//   test('returns false if a string is not a valid hsl color without alpha', () => {
//     expect(isHslStandard('hsl(0, 0%, 0%)0')).toBe(false) // extra characters
//     expect(isHslStandard('hsl(360, 100%, 100%)%')).toBe(false) // invalid character
//   })
// })

// describe('isRgb', () => {
//   test('returns true if a string is a valid rgb color', () => {
//     expect(isRgb('rgb(0, 0, 0)')).toBe(true)
//     expect(isRgb('rgb(255, 255, 255)')).toBe(true)
//     expect(isRgb('rgb(240, 240, 240)')).toBe(true)
//     expect(isRgb('rgba(0, 0, 0, 0)')).toBe(true) // with alpha
//   })

//   test('returns false if a string is not a valid rgb color', () => {
//     expect(isRgb('rgb(0, 0, 0')).toBe(false) // missing closing parenthesis
//     expect(isRgb('rgb(255, 255, 255)0')).toBe(false) // extra characters
//     expect(isRgb('rgb(255, 255, 255)%')).toBe(false) // invalid character
//   })
// })

// describe('isRgbAlpha', () => {
//   test('returns true if a string is a valid rgb color with alpha', () => {
//     expect(isRgbAlpha('rgba(0, 0, 0, 0)')).toBe(true)
//     expect(isRgbAlpha('rgba(255, 255, 255, 1)')).toBe(true)
//     expect(isRgbAlpha('rgba(240, 240, 240, 0.5)')).toBe(true)
//   })

//   test('returns false if a string is not a valid rgb color with alpha', () => {
//     expect(isRgbAlpha('rgba(0, 0, 0)')).toBe(false) // missing alpha value
//     expect(isRgbAlpha('rgba(255, 255, 255, 1)0')).toBe(false) // extra characters
//     expect(isRgbAlpha('rgba(255, 255, 255, 1)%')).toBe(false) // invalid character
//   })
// })

// describe('isRgbStandard', () => {
//   test('returns true if a string is a valid rgb color without alpha', () => {
//     expect(isRgbStandard('rgb(0, 0, 0)')).toBe(true)
//     expect(isRgbStandard('rgb(255, 255, 255)')).toBe(true)
//     expect(isRgbStandard('rgb(240, 240, 240)')).toBe(true)
//   })

//   test('returns false if a string is not a valid rgb color without alpha', () => {
//     expect(isRgbStandard('rgb(0, 0, 0)0')).toBe(false) // extra characters
//     expect(isRgbStandard('rgb(255, 255, 255)%')).toBe(false) // invalid character
//   })
// })
