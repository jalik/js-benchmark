# Changelog

## v2.0.0

- **[BREAKING CHANGE]** Renamed function `measure()` to `measureSync()`
- **[BREAKING CHANGE]** Renamed function `benchmark()` to `benchmarkSync()`
- Upgraded dependencies

## v1.1.5

- Upgraded dependencies

## v1.1.4

- Upgraded dependencies

## v1.1.3

- Added `esnext` and `sideEffects` in package.json
- Upgraded dependencies

## v1.1.2

- Upgraded dependencies

## v1.1.1

- Upgraded dependencies

## v1.1.0

- Fixed measure and benchmark results when `performance.now()` is not available
- Fixed some internal functions
- Changes how test name are displayed in `logBenchmarkResult()`
- Export `logBenchmarkResult` and `logMeasureResult` in main package file
- Display benchmark result sorted from fastest to slowest in `logBenchmarkResult()`
- Added a `rank` attribute to each benchmark result
- Added unit tests for utils functions

## v1.0.0

- First public release
