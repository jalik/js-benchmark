# @jalik/benchmark

![GitHub package.json version](https://img.shields.io/github/package-json/v/jalik/js-benchmark.svg)
[![Build Status](https://travis-ci.com/jalik/js-benchmark.svg?branch=master)](https://travis-ci.com/jalik/js-benchmark)
![GitHub](https://img.shields.io/github/license/jalik/js-benchmark.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/jalik/js-benchmark.svg)
[![GitHub issues](https://img.shields.io/github/issues/jalik/js-benchmark.svg)](https://github.com/jalik/js-benchmark/issues)
![npm](https://img.shields.io/npm/dt/@jalik/benchmark.svg)

## Measure a single function

To measure a single function, use `measureSync(func, iterations)`.

```js
import { measureSync } from '@jalik/benchmark';

function logHelloWorld() {
  console.log('hello world');
}

// Run function 1000 times
const result = measureSync(logHelloWorld, 1000);
```

The result object of a measure looks like this:

```typescript
interface MeasureResult {
  average: number;
  fastest: number;
  ips: number;
  ipsAccuracy: number;
  ipsRounded: number;
  iterations: number;
  median: number;
  slowest: number;
  total: number;
}
```

You can show measure result in the console with `logMeasureResult(result)`.

```js
import { logMeasureResult } from '@jalik/benchmark';

// const result = measureSync(func, iterations);
logMeasureResult(result);
```

```text
iterations/s: 82 ±-0.36%
total: 1224.95 ms
average: 12.25 ms
median: 11.93 ms
fastest: 11.58 ms
slowest: 24.43 ms
```

## Measure several functions

To measure several functions, use `benchmarkSync(funcs, iterations)`.

```js
import { benchmarkSync } from '@jalik/benchmark';

function incrementPlusPlus() {
  for (let i = 0; i < 10000; i++) {
    // do something
  }
}

function incrementPlusEqual() {
  for (let i = 0; i < 10000; i += 1) {
    // do something
  }
}

const funcs = {
  incrementPlusPlus,
  incrementPlusEqual,
};

// Run each function 1000 times 
const result = benchmarkSync(funcs, 1000);
```

The result object of a benchmark looks like this:

```typescript
interface BenchmarkResult {
  [key: string]: MeasureResult;
}
```

You can show benchmark result in the console with `logBenchmarkResult(result)`.

```js
import { benchmarkSync, logBenchmarkResult } from '@jalik/benchmark';

const result = benchmarkSync({
  doSomethingSlow: () => { /* ... */ },
  doSomethingFast: () => { /* ... */ },
}, 1000);

logBenchmarkResult(result);
```

```text
#1 doSomethingFast
iterations/s: 1250 ±0.00%
total: 8.00 ms
average: 0.80 ms
median: 1.00 ms
fastest: 0.00 ms
slowest: 1.00 ms

#2 doSomethingSlow
iterations/s: 40 ±0.00%
total: 250.00 ms
average: 25.00 ms
median: 25.00 ms
fastest: 24.00 ms
slowest: 27.00 ms
```

## Changelog

History of releases is in the [changelog](./CHANGELOG.md).

## License

The code is released under the [MIT License](http://www.opensource.org/licenses/MIT).
