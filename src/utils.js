/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2020 Karl STEIN
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

/**
 * Calculates iterations per second.
 * @param {number} time
 * @param {number} iterations
 * @return {number}
 */
export function calculateIps(time, iterations) {
  const ratio = 1000 / time;
  return iterations * ratio;
}

/**
 * Returns the statistics of times.
 * @param {number[]} times
 * @return {*}
 */
export function calculateStats(times) {
  const total = times.reduce((a, b) => a + b, 0);
  const average = total / times.length;
  const ips = calculateIps(total, times.length);
  // eslint-disable-next-line no-use-before-define
  const ipsRounded = roundToNearest(ips);
  const ipsAccuracy = ips - ipsRounded;
  // eslint-disable-next-line no-use-before-define
  const med = median(times);
  // eslint-disable-next-line no-use-before-define
  const fastest = min(times);
  // eslint-disable-next-line no-use-before-define
  const slowest = max(times);
  return {
    average,
    fastest,
    // eslint-disable-next-line no-use-before-define
    ips,
    ipsAccuracy,
    ipsRounded,
    iterations: times.length,
    median: med,
    slowest,
    total,
  };
}

/**
 * Returns the current time in milliseconds (with floating precision if supported).
 * @return {number}
 */
export function currentMillis() {
  return typeof performance !== 'undefined' && 'now' in performance
    ? performance.now()
    : Date.now;
}

/**
 * Returns the formatted time.
 * @param {number} time
 * @return {string}
 */
export function formatMillis(time) {
  // eslint-disable-next-line no-restricted-globals
  return (typeof time === 'number' && !isNaN(time))
    ? time.toFixed(2)
    : null;
}

/**
 * Returns the maximal value of numbers.
 * @param {number[]} numbers
 * @return {null|number}
 */
export function max(numbers) {
  if (numbers.length === 0) return null;
  let num = -Infinity;

  for (let i = 0; i < numbers.length; i += 1) {
    if (numbers[i] > num) {
      num = numbers[i];
    }
  }
  return num;
}

/**
 * Returns the median value of numbers.
 * @param {number[]} numbers
 * @return {null|number}
 */
export function median(numbers) {
  if (numbers.length === 0) return null;
  const sortedNumbers = [...numbers];

  for (let i = 0; i < numbers.length; i += 1) {
    if (typeof numbers[i] === 'number') {
      sortedNumbers.push(numbers[i]);
    }
  }
  sortedNumbers.sort();
  const half = Math.floor(sortedNumbers.length / 2);
  return sortedNumbers.length % 2
    ? sortedNumbers[half]
    : (sortedNumbers[half - 1] + sortedNumbers[half]) / 2.0;
}

/**
 * Returns the minimal value of numbers.
 * @param {number[]} numbers
 * @return {null|number}
 */
export function min(numbers) {
  if (numbers.length === 0) return null;
  let num = Infinity;

  for (let i = 0; i < numbers.length; i += 1) {
    if (numbers[i] < num) {
      num = numbers[i];
    }
  }
  return num;
}

/**
 * Returns the nearest number
 * @param number
 * @param precision
 * @return {number}
 */
export function roundToNearest(number, precision = 0) {
  // https://stackoverflow.com/a/51166559/2881350
  const m = 10 ** precision;
  const p = 17 - precision - (Math.round(number * m) / m).toString().length;
  return Math.round(number * m + 0.1 ** p) / m;
}
