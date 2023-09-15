# Changelog

## v2.0.3 (2023-09-15)

- Fixed async functions (benchmark and measure) to not run in parallel
- Upgraded dependencies

## v2.0.2 (2022-10-18)

- Upgraded dependencies

## v2.0.1 (2021-09-20)

- Upgraded dependencies

## v2.0.0 (2021-06-14)

- **[BREAKING CHANGE]** Renamed function `measure()` to `measureSync()`
- **[BREAKING CHANGE]** Renamed function `benchmark()` to `benchmarkSync()`
- **[BREAKING CHANGE]** Functions `measure()` and `benchmark()` are now used for async code (with
  promises)
- Added async function `measure()`
- Added async function `benchmark()`
- Upgraded dependencies

## v1.1.5 (2021-05-18)

- Upgraded dependencies

## v1.1.4 (2021-01-18)

- Upgraded dependencies

## v1.1.3 (2020-11-10)

- Added `esnext` and `sideEffects` in package.json
- Upgraded dependencies

## v1.1.2 (2020-09-17)

- Upgraded dependencies

## v1.1.1 (2020-08-06)

- Upgraded dependencies

## v1.1.0 (2020-04-17)

- Fixed measure and benchmark results when `performance.now()` is not available
- Fixed some internal functions
- Changes how test name are displayed in `logBenchmarkResult()`
- Export `logBenchmarkResult` and `logMeasureResult` in main package file
- Display benchmark result sorted from fastest to slowest in `logBenchmarkResult()`
- Added a `rank` attribute to each benchmark result
- Added unit tests for utils functions

## v1.0.0 (2020-04-16)

- First public release
