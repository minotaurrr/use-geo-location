[![minotaurrr](https://circleci.com/gh/minotaurrr/use-geo-location.svg?style=shield)](https://github.com/minotaurrr/use-geo-location)

Custom react hook for getting user's geo location. Supports TypeScript by default.

# Installation

```
$ yarn add use-geo-location
```

OR

```
$ npm i use-geo-location
```

# Basic Usage

```
import React from 'react';
import { useGeoLocation } from 'use-geo-location';

const TestComponent = () => {
  const { latitude, longitude, loading, error, timestamp } = useGeoLocation();

  return (
    <>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <div>
          <span>latitude: {latitude}</span>
          <br />
          <span>longitude: {longitude}</span>
        </div>
      )}
    </>
  );
};

```

# Description

`useGeoLocation()` can take an options parameter like below:

```
const config = {
  enableHighAccuracy: false, // default value is false
  timeout: 10000, // default value is 10000
  maximumAge: 0, // default value is 0
}
useGeoLocation({ watch: true, config }) // watch is set to `false` by default
```

### Options

- Setting `enableHighAccuracy: true` may result in slower response and increased power consumption.

- `timeout` is the length of time allowed in milliseconds until it gets the user's coords back

- `maximumAge` is the length of time in milleseconds until it retries to get user's location. Setting this value to `0` means it will immediately attempt to acquire user's location.

### Watch parameter

If `watch` is set to `true` (set to `false` by default), it'll continuously continuously attempt to get user's position, this is useful when user is using a mobile device.
If it's set to true, it will fetch user's position on render and cache it. The cached value will be used until it reaches its `maximumAge`, set in options.

# Error handling

The `error` object returned from `useGeoLocation()` is an instance of `GeolocationPositionError`.
Please see https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPositionError for details.

When geo location is not available on user's device, it will return the following error.

```
{
  code: -1,
  message: 'Geolocation not available',
  PERMISSION_DENIED: 1,
  POSITION_UNAVAILABLE: 2,
  TIMEOUT: 3,
}
```

# Testing

```
$ yarn test
```

OR

```
$ npm test
```
