/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2023 Karl STEIN
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
import { measure, measureSync } from '../src'
import { asyncJob, job } from './lib'

describe('measure(func, iterations)', () => {
  const iterations = 100
  const doWorkAsync = async () => {
    await asyncJob(1)
  }
  const promise = measure(doWorkAsync, iterations)

  it('should return a Promise', () => {
    expect(promise).toBeInstanceOf(Promise)
  })

  it('should return average time', async () => {
    const result = await promise
    expect(typeof result.average).toBe('number')
  })

  it('should return fastest time', async () => {
    const result = await promise
    expect(typeof result.fastest).toBe('number')
  })

  it('should return iterations per second', async () => {
    const result = await promise
    expect(typeof result.ips).toBe('number')
  })

  it('should return iterations per second accuracy', async () => {
    const result = await promise
    expect(typeof result.ipsAccuracy).toBe('number')
  })

  it('should return rounded iterations per second', async () => {
    const result = await promise
    expect(typeof result.ipsRounded).toBe('number')
  })

  it('should return number of iterations', async () => {
    const result = await promise
    expect(typeof result.iterations).toBe('number')
  })

  it('should return median time', async () => {
    const result = await promise
    expect(typeof result.median).toBe('number')
  })

  it('should return slowest time', async () => {
    const result = await promise
    expect(typeof result.slowest).toBe('number')
  })

  it('should return total time', async () => {
    const result = await promise
    expect(typeof result.total).toBe('number')
  })

  it('should call func {iterations} times', async () => {
    const result = await promise
    expect(result.iterations).toBe(iterations)
  })
})

describe('measureSync(func, iterations)', () => {
  const iterations = 100
  const doWorkSync = () => {
    job(1)
  }
  const result = measureSync(doWorkSync, iterations)

  it('should return an object', () => {
    expect(result).not.toBeNull()
    expect(typeof result).toBe('object')
  })

  it('should return average time', () => {
    expect(typeof result.average).toBe('number')
  })

  it('should return fastest time', () => {
    expect(typeof result.fastest).toBe('number')
  })

  it('should return iterations per second', () => {
    expect(typeof result.ips).toBe('number')
  })

  it('should return iterations per second accuracy', () => {
    expect(typeof result.ipsAccuracy).toBe('number')
  })

  it('should return rounded iterations per second', () => {
    expect(typeof result.ipsRounded).toBe('number')
  })

  it('should return number of iterations', () => {
    expect(typeof result.iterations).toBe('number')
  })

  it('should return median time', () => {
    expect(typeof result.median).toBe('number')
  })

  it('should return slowest time', () => {
    expect(typeof result.slowest).toBe('number')
  })

  it('should return total time', () => {
    expect(typeof result.total).toBe('number')
  })

  it('should call func {iterations} times', () => {
    expect(result.iterations).toBe(iterations)
  })
})
