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

export type Stats = ReturnType<typeof calculateStats>

/**
 * Calculates iterations per second.
 * @param time
 * @param iterations
 */
export function calculateIps (time: number, iterations: number) {
  const ratio = 1000 / time
  return iterations * ratio
}

/**
 * Calculates statistics of several times.
 * @param times
 */
export function calculateStats (times: number[]) {
  const total = sum(times)
  const average = total / times.length
  const ips = calculateIps(total, times.length)
  const ipsRounded = roundToNearest(ips)
  const ipsAccuracy = ips - ipsRounded
  const med = median(times)
  const fastest = min(times)
  const slowest = max(times)
  return {
    average,
    fastest,
    ips,
    ipsAccuracy,
    ipsRounded,
    iterations: times.length,
    median: med,
    rank: null as unknown as number,
    slowest,
    total
  }
}

/**
 * Returns the current time in milliseconds (with floating precision if supported).
 */
export function currentMillis () {
  return typeof performance !== 'undefined' && 'now' in performance
    ? performance.now()
    : Date.now()
}

/**
 * Returns the formatted time.
 * @param time
 */
export function formatMillis (time: number) {
  return Number.isFinite(time)
    ? time.toFixed(2)
    : null
}

/**
 * Returns the maximal value of numbers.
 * @param numbers
 */
export function max (numbers: number[]) {
  if (numbers.length === 0) return 0
  let num = -Infinity

  for (let i = 0; i < numbers.length; i += 1) {
    if (numbers[i] > num) {
      num = numbers[i]
    }
  }
  return num
}

/**
 * Returns the median value of numbers.
 * @param numbers
 */
export function median (numbers: number[]) {
  if (numbers.length === 0) return 0
  const sortedNumbers = [...numbers]

  for (let i = 0; i < numbers.length; i += 1) {
    if (typeof numbers[i] === 'number') {
      sortedNumbers.push(numbers[i])
    }
  }
  sortedNumbers.sort()
  const half = Math.floor(sortedNumbers.length / 2)
  return sortedNumbers.length % 2
    ? sortedNumbers[half]
    : (sortedNumbers[half - 1] + sortedNumbers[half]) / 2.0
}

/**
 * Returns the minimal value of numbers.
 * @param numbers
 */
export function min (numbers: number[]) {
  if (numbers.length === 0) return 0
  let num = Infinity

  for (let i = 0; i < numbers.length; i += 1) {
    if (numbers[i] < num) {
      num = numbers[i]
    }
  }
  return num
}

/**
 * Returns the nearest number.
 * @param number
 * @param precision
 */
export function roundToNearest (number: number, precision = 0) {
  // https://stackoverflow.com/a/51166559/2881350
  const m = 10 ** precision
  const p = 17 - precision - (Math.round(number * m) / m).toString().length
  return Math.round(number * m + 0.1 ** p) / m
}

/**
 * Returns the sum of numbers.
 * @param numbers
 */
export function sum (numbers: number[]) {
  if (numbers.length === 0) return 0
  let total = 0

  for (let i = 0; i < numbers.length; i += 1) {
    if (typeof numbers[i] === 'number') {
      total += numbers[i]
    }
  }
  return total
}
