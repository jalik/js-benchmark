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

import benchmark, { logBenchmarkResult } from '../src/benchmark';

describe('benchmark(funcs, iterations)', () => {
  const counters = [0, 0];
  const iterations = 100;
  const funcs = {
    test1: () => { counters[0] += 1; },
    test2: () => { counters[1] += 1; },
  };
  const result = benchmark(funcs, iterations);

  logBenchmarkResult(result);

  it('should return an object', () => {
    expect(result).not.toBeNull();
    expect(typeof result).toBe('object');
  });

  it('should return a result for each func', () => {
    Object.entries(funcs).forEach(([title]) => {
      expect(typeof result[title]).not.toBeNull();
      expect(typeof result[title]).toBe('object');
    });
  });

  it('should call each func {iterations} times', () => {
    Object.entries(funcs).forEach((kv, index) => {
      expect(counters[index]).toBe(iterations);
    });
  });
});
