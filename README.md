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

There are two main types of error `useGeoLocation()` can throw.

### GeolocationPositonError

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

### Google Maps API Error

Refer to [this link](https://developers.google.com/maps/documentation/geocoding/overview?hl=en_GB#ErrorMessages) for details on Google Maps API errors.
Here's a short summary of status message.

| Status             | Description                                                                                                                                                                                                                                                                                           |
| :----------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OK`               | indicates that no errors occurred; the address was successfully parsed and at least one geocode was returned.                                                                                                                                                                                         |
| `ZERO_RESULTS`     | indicates that the geocode was successful but returned no results. This may occur if the geocoder was passed a non-existent address.                                                                                                                                                                  |
| `OVER_DAILY_LIMIT` | indicates any of the following:<br><ul><li>The API key is missing or invalid.</li><li>Billing has not been enabled on your account.</li><li>A self-imposed usage cap has been exceeded.</li><li>The provided method of payment is no longer valid (for example, a credit card has expired).</li></ul> |
| `OVER_QUERY_LIMIT` | indicates that you are over your quota.                                                                                                                                                                                                                                                               |
| `REQUEST_DENIED`   | indicates that your request was denied.                                                                                                                                                                                                                                                               |
| `INVALID_REQUEST`  | generally indicates that the query (address, components or latlng) is missing.                                                                                                                                                                                                                        |
| `UNKNOWN_ERROR`    | indicates that the request could not be processed due to a server error. The request may succeed if you try again.                                                                                                                                                                                    |

# Testing

```
$ yarn test
```

OR

```
$ npm test
```
