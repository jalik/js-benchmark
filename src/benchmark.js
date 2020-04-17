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

  Object.entries(funcs).forEach((entry) => {
    result[entry[0]] = measure(entry[1], iterations);
  });
  return result;
}

/**
 * Displays benchmark result in the console.
 * @param result
 */
export function logBenchmarkResult(result) {
  const entries = Object.entries(result);
  entries.forEach((entry) => {
    // eslint-disable-next-line no-console
    console.info(`Test: ${entry[0]}`);
    // eslint-disable-next-line no-use-before-define
    logMeasureResult(entry[1]);
  });
}

export default benchmark;
