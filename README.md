# @jalik/benchmark

![GitHub package.json version](https://img.shields.io/github/package-json/v/jalik/js-benchmark.svg)
[![Build Status](https://travis-ci.com/jalik/js-benchmark.svg?branch=master)](https://travis-ci.com/jalik/js-benchmark)
![GitHub](https://img.shields.io/github/license/jalik/js-benchmark.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/jalik/js-benchmark.svg)
[![GitHub issues](https://img.shields.io/github/issues/jalik/js-benchmark.svg)](https://github.com/jalik/js-benchmark/issues)
![npm](https://img.shields.io/npm/dt/@jalik/benchmark.svg)

## Measure a single function

To measure a single function, use `measure(func, iterations: number): MeasureResult`.

```js
import { measure } from "@jalik/benchmark";

function logHelloWorld() {
  console.log('hello world');
}

// Run function 1000 times
const result = measure(logHelloWorld, 1000);
```

Which returns a `MeasureResult` object defined as below:

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

You can show formatted result in the console by using `logMeasureResult(result: MeasureResult)`,
which outputs something like this:

```text
iterations/s: 82 ±-0.36%
total: 1224.95 ms
average: 12.25 ms
median: 11.93 ms
fastest: 11.58 ms
slowest: 24.43 ms
```

## Measure several functions

To measure several functions, use `benchmark(funcs, iterations: number): BenchmarkResult`.

```js
import { benchmark } from "@jalik/benchmark";

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
const result = benchmark(funcs, 1000);
```

Which returns a `BenchmarkResult` object defined as below:

```typescript
interface BenchmarkResult {
  [key: string]: MeasureResult;
}
```

## Changelog

History of releases is in the [changelog](./CHANGELOG.md).

## License

The code is released under the [MIT License](http://www.opensource.org/licenses/MIT).
