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

import { AsyncJob, logMeasureResult, measure, measureSync, SyncJob } from './measure'
import { Stats } from './utils'

export type AsyncJobs = Record<string, AsyncJob>
export type SyncJobs = Record<string, SyncJob>
export type BenchmarkResult = Record<string, Stats>

/**
 * Measures the execution times of several async functions.
 * @param jobs
 * @param iterations
 */
export async function benchmark (jobs: AsyncJobs, iterations = 1) {
  const results: [string, Stats][] = []
  const result: BenchmarkResult = {}
  const entries = Object.entries(jobs)

  for (let i = 0; i < entries.length; i += 1) {
    const [name, asyncFunc] = entries[i]
    const stats = await measure(asyncFunc, iterations)
    results.push([name, stats])
    // todo allow pausing between jobs
  }

  // Sort result from fastest to slowest.
  const sortedResults = results
    .sort((a, b) => a[1].total - b[1].total)

  // Assign rank to each result.
  sortedResults.forEach(([name, stats], index) => {
    result[name] = { ...stats, rank: index + 1 }
  })
  return result
}

/**
 * Measures the execution times of several functions.
 * @param jobs
 * @param iterations
 */
export function benchmarkSync (jobs: SyncJobs, iterations = 1) {
  const result: BenchmarkResult = {}
  const entries = Object.entries(jobs)

  for (let i = 0; i < entries.length; i += 1) {
    const [name, func] = entries[i]
    result[name] = measureSync(func, iterations)
  }

  // Sort result from fastest to slowest.
  const sortedResult = Object.entries(result)
    .sort((a, b) => a[1].total - b[1].total)

  // Assign rank to each result.
  sortedResult.forEach(([name, stats], index) => {
    result[name] = { ...stats, rank: index + 1 }
  })
  return result
}

/**
 * Displays the benchmark result in the console.
 * @param result
 */
export function logBenchmarkResult (result: BenchmarkResult) {
  // Sort result from fastest to slowest.
  const sortedResult = Object.entries(result)
    .map((el): [string, number] => [el[0], el[1].total])
    .sort((a, b) => a[1] - b[1])

  // Display each result to the console.
  sortedResult.forEach((entry, index) => {
    const mr = result[entry[0]]
    const pre = index > 0 && index < sortedResult.length ? '\r\n' : ''
    console.info(`${pre}#${mr.rank} ${entry[0]}`)
    logMeasureResult(mr)
  })
}
