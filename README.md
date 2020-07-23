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

Refer to [this link](https://developers.google.com/maps/documentation/geocoding/overview?hl=en_GB#ReverseGeocoding) for Google Maps response.

```
import React from 'react';
import { useGeoLocation } from 'use-geo-location';

const TestComponent = () => {
  const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';
  const { latitude, longitude, loading, error, timestamp, googleMapsResults } = useGeoLocation({ apiKey }); // apiKey is optional

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

# Function description

### `useGeoLocation()`

The following can be provided as options:

| Param  | Optional | Type                                                                    |
| :----- | :------- | :---------------------------------------------------------------------- |
| apiKey | Yes      | string                                                                  |
| watch  | Yes      | boolean                                                                 |
| config | Yes      | `{ enableHighAccuracy: boolean; timeout: number; maximumAge: number; }` |

```
// e.g.
const config = {
  enableHighAccuracy: false, // default value is false
  timeout: 10000, // default value is 10000
  maximumAge: 0, // default value is 0
}
const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY'
useGeoLocation({ watch: true, config, apiKey }) // watch is set to `false` by default
```

### Options

- Setting `enableHighAccuracy: true` may result in slower response and increased power consumption.

- `timeout` is the length of time allowed in milliseconds until it gets the user's coords back

- `maximumAge` is the length of time in milleseconds until it retries to get user's location. Setting this value to `0` means it will immediately attempt to acquire user's location.

`useGeoLocation()` will return the following:

| Value             | Type                             | Description                                                |
| :---------------- | :------------------------------- | :--------------------------------------------------------- |
| latitude          | `number \| undefined`            | user's latitude                                            |
| longitude         | `number \| undefined`            | user's longitude                                           |
| loading           | `boolean`                        | loading status                                             |
| error             | `Error`                          | any error caught from fetching location                    |
| timestamp         | `number \| undefined`            | unix timestamp of whem user location was last fetched      |
| googleMapsResults | `GoogleMapsResults \| undefined` | google maps api response for user's latitude and longitude |

### GoogleMapsResults

| Value     | Type     |
| :-------- | :------- |
| plus_code | `any`    |
| status    | `string` |
| results   | `any[]`  |

Please refer to [this link](https://developers.google.com/maps/documentation/geocoding/overview?hl=en_GB) for details on what Google Maps API returns.

### Watch parameter

If `watch` is set to `true` (set to `true` by default), it'll continuously continuously attempt to get user's position, this is useful when user is using a mobile device.
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
