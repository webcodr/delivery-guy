# Changelog

## 4.1.0

### Changes

- The payload of `deliverPostJson()` will be automatically stringified
- Add default content type for method `deliverPostJson()`
- Add deep merge ability of RequestOptions for method `deliverPostJson()`

## 4.0.0

### Breaking Changes

- Rename `start` to `request` and `end` to `response`

### Changes

- Add shortcut method `deliverPostJson()`

## 3.2.0

### Changes

- Refactored interceptor handling
- Added interceptor `error`

## 3.1.0

### Changes

- Added interceptors `start` and `end`

## 3.0.0

### Changes

- Moved from Webpack to Rollup for much smaller build sizes

## 2.0.5

### Changes

- Release script bug fix

## 2.0.4

### Changes

- Added release script

## 2.0.3

### Changes

- Add typecheck of `Error.captureStackTrace` and improve branch coverage to 100%

## 2.0.2

### Changes

- Added typechecks with Flow

## 2.0.1

### Changes

- Fixed example in readme file

## 2.0.0

### Breaking changes

- Renamed property `ReponseError.body` to `ResponseError.responseBody`
- Moved original functionality with parsed JSON response to method `deliverJson()`. `deliver()` will now return a Fetch API response object.

## 1.1.0

### Changes

- Added files section to `package.json` for smaller module footprint

## 1.0.3

### Changes

- Fixed module build (exports were broken)

## 1.0.2

### Changes

- Added Webpack to build step

## 1.0.1

### Changes

- Added example to readme file

## 1.0.0

Initial release version.
