import { test, describe, expect } from 'vitest'
import {
  roundToNearestN,
  getPrimeFactors,
  lowestPrimeFactor,
  gcd,
} from './math'

describe('roundToNearestN', () => {
  test('rounds a number to the nearest multiple of n', () => {
    const roundToNearest5 = roundToNearestN(5);
    expect(roundToNearest5(13)).toBe(15)
    expect(roundToNearest5(12)).toBe(10)
  })
})

describe('getPrimeFactors', () => {
  test('returns the prime factors of a number', () => {
    expect(getPrimeFactors(12)).toEqual([2, 2, 3])
    expect(getPrimeFactors(15)).toEqual([3, 5])
  })
})

describe('lowestPrimeFactor', () => {
  test('returns the lowest prime factor of a number', () => {
    expect(lowestPrimeFactor(12)).toBe(2)
    expect(lowestPrimeFactor(15)).toBe(3)
  })
})

describe('gcd', () => {
  test('returns the greatest common divisor of two numbers', () => {
    expect(gcd(12, 15)).toBe(3)
    expect(gcd(12, 18)).toBe(6)
  })
})