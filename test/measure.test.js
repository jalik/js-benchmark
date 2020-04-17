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

import measure, { logMeasureResult } from '../src/measure';

describe('measure(func, iterations)', () => {
  const iterations = 100;
  const result = measure(() => {
    const arr = [];
    for (let i = 0; i < 1000; i += 1) {
      arr.push(i / Math.random() ** 10);
    }
    arr.sort();
  }, iterations);

  logMeasureResult(result);

  it('should return an object', () => {
    expect(result).not.toBeNull();
    expect(typeof result).toBe('object');
  });

  it('should return average time', () => {
    expect(typeof result.average).toBe('number');
  });

  it('should return fastest time', () => {
    expect(typeof result.fastest).toBe('number');
  });

  it('should return iterations per second', () => {
    expect(typeof result.ips).toBe('number');
  });

  it('should return iterations per second accuracy', () => {
    expect(typeof result.ipsAccuracy).toBe('number');
  });

  it('should return rounded iterations per second', () => {
    expect(typeof result.ipsRounded).toBe('number');
  });

  it('should return number of iterations', () => {
    expect(typeof result.iterations).toBe('number');
  });

  it('should return median time', () => {
    expect(typeof result.median).toBe('number');
  });

  it('should return slowest time', () => {
    expect(typeof result.slowest).toBe('number');
  });

  it('should return total time', () => {
    expect(typeof result.total).toBe('number');
  });

  it('should call func {iterations} times', () => {
    expect(result.iterations).toBe(iterations);
  });
});
