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
 *
 */

import measure, { logMeasureResult } from './measure';

/**
 * Measures the execution times of several functions.
 * @param funcs
 * @param {number} iterations
 * @return {*}
 */
function benchmark(funcs, iterations = 1) {
  const result = {};

  // Measure functions.
  Object.entries(funcs).forEach((entry) => {
    result[entry[0]] = measure(entry[1], iterations);
  });

  // Sort result from fastest to slowest.
  const sortedResult = Object.entries(result)
    .map((entry) => [entry[0], entry[1].total])
    .sort((a, b) => a[1] - b[1]);

  // Assign rank to each function result.
  sortedResult.forEach((r, index) => {
    result[r[0]].rank = index + 1;
  });

  return result;
}

/**
 * Displays benchmark result in the console.
 * @param result
 */
export function logBenchmarkResult(result) {
  // Sort result from fastest to slowest.
  const sortedResult = Object.entries(result)
    .map((entry) => [entry[0], entry[1].total])
    .sort((a, b) => a[1] - b[1]);

  // Display each result to console.
  sortedResult.forEach((entry, index) => {
    const mr = result[entry[0]];
    const pre = index > 0 && index < sortedResult.length ? '\r\n' : '';
    // eslint-disable-next-line no-console
    console.info(`${pre}#${mr.rank} ${entry[0]}`);
    logMeasureResult(mr);
  });
}

export default benchmark;
