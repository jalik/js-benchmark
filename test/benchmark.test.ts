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

import { describe, expect, it, vi } from 'vitest'
import { benchmark, benchmarkSync } from '../src'
import { asyncJob, job } from './lib'

describe('benchmark(funcs, iterations)', () => {
  const iterations = 1
  const job1 = vi.fn(() => asyncJob(100000))
  const job2 = vi.fn(() => asyncJob(200000))
  const job3 = vi.fn(() => asyncJob(300000))
  const funcs = { job2, job1, job3 }
  const promise = benchmark(funcs, iterations)

  it('should return a Promise', () => {
    expect(promise).toBeInstanceOf(Promise)
  })

  it('should return a result for each func', async () => {
    const result = await promise
    Object.entries(funcs).forEach(([name]) => {
      expect(typeof result[name]).not.toBeNull()
      expect(typeof result[name]).toBe('object')
    })
  })

  it('should return a rank for each func result', async () => {
    const result = await promise
    Object.entries(funcs).forEach(([name]) => {
      expect(typeof result[name].rank).toBe('number')
    })
  })

  it('should call each func {iterations} times', async () => {
    await promise
    Object.values(funcs).forEach((fn) => {
      expect(fn).toBeCalledTimes(iterations + 1) // +1 is needed to cancel
      // cold start time
    })
  })

  it('should return the same number of results as number of jobs', async () => {
    const result = await promise
    expect(Object.keys(result).length).toBe(Object.keys(funcs).length)
  })

  it('should return ranked jobs', async () => {
    const result = await promise
    expect(result.job1.rank).toBe(1)
    expect(result.job2.rank).toBe(2)
    expect(result.job3.rank).toBe(3)
  })
})

describe('benchmarkSync(funcs, iterations)', () => {
  const iterations = 100
  const job1 = vi.fn(() => job(100000))
  const job2 = vi.fn(() => job(200000))
  const job3 = vi.fn(() => job(300000))
  const funcs = { job2, job1, job3 }
  const result = benchmarkSync(funcs, iterations)

  it('should return an object', () => {
    expect(result).not.toBeNull()
    expect(typeof result).toBe('object')
  })

  it('should return a result for each func', () => {
    Object.entries(funcs).forEach(([name]) => {
      expect(typeof result[name]).not.toBeNull()
      expect(typeof result[name]).toBe('object')
    })
  })

  it('should return a rank for each func result', () => {
    Object.entries(funcs).forEach(([name]) => {
      expect(typeof result[name].rank).toBe('number')
    })
  })

  it('should call each func {iterations} times', () => {
    Object.values(funcs).forEach((fn) => {
      expect(fn).toBeCalledTimes(iterations)
    })
  })

  it('should return ranked jobs', () => {
    expect(result.job1.rank).toBe(1)
    expect(result.job2.rank).toBe(2)
    expect(result.job3.rank).toBe(3)
  })
})
