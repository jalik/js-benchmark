/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2022 Karl STEIN
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
  describe,
  expect,
  it,
} from '@jest/globals';
import {
  benchmark,
  benchmarkSync,
} from '../src/benchmark';

describe('benchmark(funcs, iterations)', () => {
  const counters = [0, 0];
  const iterations = 100;
  const doWorkAsync = () => (
    new Promise((resolve) => {
      setTimeout(() => {
        counters[0] += 1;
        resolve(counters[0]);
      }, 1000);
    })
  );
  const doWorkAsync2 = () => (
    new Promise((resolve) => {
      setTimeout(() => {
        counters[1] += 1;
        resolve(counters[1]);
      }, 2000);
    })
  );
  const funcs = {
    doWorkAsync,
    doWorkAsync2,
  };
  const promise = benchmark(funcs, iterations);

  it('should return a Promise', () => {
    expect(promise).toBeInstanceOf(Promise);
  });

  it('should return a result for each func', () => (
    promise.then((r) => {
      Object.entries(funcs).forEach(([name]) => {
        expect(typeof r[name]).not.toBeNull();
        expect(typeof r[name]).toBe('object');
      });
    })
  ));

  it('should return a rank for each func result', () => (
    promise.then((r) => {
      Object.entries(funcs).forEach(([name]) => {
        expect(typeof r[name].rank).toBe('number');
      });
    })
  ));

  it('should call each func {iterations} times', () => (
    promise.then(() => {
      Object.entries(funcs).forEach((kv, index) => {
        expect(counters[index]).toBe(iterations);
      });
    })
  ));
});

describe('benchmarkSync(funcs, iterations)', () => {
  const counters = [0, 0];
  const iterations = 100;
  const funcs = {
    test1: () => { counters[0] += 1; },
    test2: () => { counters[1] += 1; },
  };
  const result = benchmarkSync(funcs, iterations);

  it('should return an object', () => {
    expect(result).not.toBeNull();
    expect(typeof result).toBe('object');
  });

  it('should return a result for each func', () => {
    Object.entries(funcs).forEach(([name]) => {
      expect(typeof result[name]).not.toBeNull();
      expect(typeof result[name]).toBe('object');
    });
  });

  it('should return a rank for each func result', () => {
    Object.entries(funcs).forEach(([name]) => {
      expect(typeof result[name].rank).toBe('number');
    });
  });

  it('should call each func {iterations} times', () => {
    Object.entries(funcs).forEach((kv, index) => {
      expect(counters[index]).toBe(iterations);
    });
  });
});
