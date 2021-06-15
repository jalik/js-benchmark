/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2021 Karl STEIN
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

import {
  calculateStats,
  currentMillis,
  formatMillis,
} from './utils';

/**
 * Measures the execution times of a function.
 * @param {function} func
 * @param {number} iterations
 * @return {*}
 */
export function measureSync(func, iterations = 1) {
  const times = [];

  for (let i = 0; i < iterations; i += 1) {
    times[i] = currentMillis();
    func();
    times[i] = currentMillis() - times[i];
  }
  return calculateStats(times);
}

/**
 * Displays measure result in the console.
 * @param result
 */
export function logMeasureResult(result) {
  // eslint-disable-next-line no-console
  console.info([
    `iterations/s: ${result.ipsRounded} ±${result.ipsAccuracy.toFixed(2)}%`,
    `total: ${formatMillis(result.total)} ms`,
    `average: ${formatMillis(result.average)} ms`,
    `median: ${formatMillis(result.median)} ms`,
    `fastest: ${formatMillis(result.fastest)} ms`,
    `slowest: ${formatMillis(result.slowest)} ms`,
  ].join('\r\n'));
}
