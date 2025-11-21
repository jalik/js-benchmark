/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2025 Karl STEIN
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { describe, expect, it } from '@jest/globals'
import {
  calculateIps,
  calculateStats,
  currentMillis,
  formatMillis,
  max,
  median,
  min,
  roundToNearest,
  sum
} from '../src/utils.ts'

describe('calculateIps(time, iterations)', () => {
  it('should return a number', () => {
    expect(typeof calculateIps(1000, 10)).toBe('number')
  })

  it('should return the calculated iterations per second', () => {
    expect(calculateIps(1000, 10)).toBe(10)
    expect(calculateIps(100, 10)).toBe(100)
    expect(calculateIps(10000, 10)).toBe(1)
  })
})

describe('calculateStats(times)', () => {
  const times = [100, 50, 200, 70, 90]
  const result = calculateStats(times)

  it('should return an object', () => {
    expect(result).not.toBeNull()
    expect(typeof result).toBe('object')
  })

  it('should return average time', () => {
    expect(typeof result.average).toBe('number')
    expect(result.average).toBe(sum(times) / times.length)
  })

  it('should return fastest time', () => {
    expect(typeof result.fastest).toBe('number')
    expect(result.fastest).toBe(min(times))
  })

  it('should return iterations per second', () => {
    expect(typeof result.ips).toBe('number')
    expect(result.ips).toBe(calculateIps(result.total, times.length))
  })

  it('should return iterations per second accuracy', () => {
    const ips = calculateIps(result.total, times.length)
    const ipsRounded = roundToNearest(ips)
    expect(typeof result.ipsAccuracy).toBe('number')
    expect(result.ipsAccuracy).toBe(ips - ipsRounded)
  })

  it('should return rounded iterations per second', () => {
    const ips = calculateIps(result.total, times.length)
    expect(typeof result.ipsRounded).toBe('number')
    expect(result.ipsRounded).toBe(roundToNearest(ips))
  })

  it('should return number of iterations', () => {
    expect(typeof result.iterations).toBe('number')
    expect(result.iterations).toBe(times.length)
  })

  it('should return median time', () => {
    expect(typeof result.median).toBe('number')
    expect(result.median).toBe(median(times))
  })

  it('should return slowest time', () => {
    expect(typeof result.slowest).toBe('number')
    expect(result.slowest).toBe(max(times))
  })

  it('should return total time', () => {
    expect(typeof result.total).toBe('number')
    expect(result.total).toBe(sum(times))
  })
})

describe('currentMillis()', () => {
  it('should return a number', () => {
    expect(typeof currentMillis()).toBe('number')
  })

  if (typeof performance !== 'undefined') {
    it('should return the current time in milliseconds', () => {
      const m = currentMillis()
      const p = performance.now()
      expect(m).toBeCloseTo(p, 1)
    })
  }
})

describe('formatMillis(time)', () => {
  it('should return a string', () => {
    expect(typeof formatMillis(10.99)).toBe('string')
  })
  it('should return the formatted number', () => {
    expect(formatMillis(10.99)).toBe('10.99')
  })
  it('should return the formatted rounded number', () => {
    expect(formatMillis(10.998)).toBe('11.00')
    expect(formatMillis(10.002)).toBe('10.00')
  })
})

describe('max(numbers)', () => {
  it('should return a number', () => {
    expect(typeof max([-10, 0, 20])).toBe('number')
  })

  it('should return the maximal value', () => {
    expect(max([-10, 0, 20])).toBe(20)
    expect(max([0, -10, 20])).toBe(20)
    expect(max([0, 20, -10])).toBe(20)
  })

  it('should ignore null values', () => {
    expect(max([null, -10, 0, 20])).toBe(20)
    expect(max([-10, 0, 20, null])).toBe(20)
  })

  it('should ignore undefined values', () => {
    expect(max([undefined, -10, 0, 20])).toBe(20)
    expect(max([-10, 0, 20, undefined])).toBe(20)
  })
})

describe('median(numbers)', () => {
  it('should return a number', () => {
    expect(typeof median([-10, 0, 20])).toBe('number')
  })

  it('should return the median value', () => {
    expect(median([-10, 0, 20])).toBe(0)
    expect(median([0, -10, 20])).toBe(0)
    expect(median([0, 20, -10])).toBe(0)
    expect(median([-10, -10, 0, 20])).toBe(-5)
  })

  it('should ignore null values', () => {
    expect(median([null, -10, 0, 20])).toBe(0)
    expect(median([-10, 0, 20, null])).toBe(0)
  })

  it('should ignore undefined values', () => {
    expect(median([undefined, -10, 0, 20])).toBe(0)
    expect(median([-10, 0, 20, undefined])).toBe(0)
  })
})

describe('min(numbers)', () => {
  it('should return a number', () => {
    expect(typeof min([-10, 0, 20])).toBe('number')
  })

  it('should return the minimal value', () => {
    expect(min([-10, 0, 20])).toBe(-10)
    expect(min([0, -10, 20])).toBe(-10)
    expect(min([0, 20, -10])).toBe(-10)
  })

  it('should ignore null values', () => {
    expect(min([null, -10, 0, 20])).toBe(-10)
    expect(min([-10, 0, 20, null])).toBe(-10)
  })

  it('should ignore undefined values', () => {
    expect(min([undefined, -10, 0, 20])).toBe(-10)
    expect(min([-10, 0, 20, undefined])).toBe(-10)
  })
})

describe('roundToNearest(number, precision)', () => {
  it('should return a number', () => {
    expect(typeof roundToNearest(10.99)).toBe('number')
  })

  it('should return the nearest rounded number', () => {
    expect(roundToNearest(10.99)).toBe(11)
    expect(roundToNearest(10.99, 1)).toBe(11)
    expect(roundToNearest(10.99, 2)).toBe(10.99)
    expect(roundToNearest(10.01)).toBe(10)
    expect(roundToNearest(10.01, 1)).toBe(10)
    expect(roundToNearest(10.01, 2)).toBe(10.01)
  })
})

describe('sum(numbers)', () => {
  it('should return a number', () => {
    expect(typeof sum([0, 10, 25, 7])).toBe('number')
  })

  it('should return the sum of values', () => {
    expect(sum([0, 10, 25, 7])).toBe(42)
    expect(sum([7, 25, 10, 0])).toBe(42)
  })

  it('should ignore null values', () => {
    expect(sum([null, 40, 2])).toBe(42)
    expect(sum([2, 40, null])).toBe(42)
  })

  it('should ignore undefined values', () => {
    expect(sum([undefined, 40, 2])).toBe(42)
    expect(sum([2, 40, undefined])).toBe(42)
  })
})
