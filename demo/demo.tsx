import React from 'react';
import { useGeoLocation } from 'useGeoLocation';
import { GeoLocationOptions, GoogleMapsResults } from 'use-geo-location';

export const Demo = ({ watch = false, useGoogleMaps = false }: { watch?: boolean; useGoogleMaps?: boolean }) => {
  const options: GeoLocationOptions = {
    watch,
    apiKey: 'YOUR_API_KEY',
  };
  const { latitude, longitude, timestamp, loading, error, googleMapsResults } = useGeoLocation(useGoogleMaps ? options : {});

  const renderLoading = () => <h1 data-testid="loading">Loading...</h1>;

  const GoogleResults = React.memo(({ data }: { data: GoogleMapsResults }) => (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  ));

  const renderGeoLocation = () => (
    <>
      <ul data-testid="geo-location">
        <li>Watching: {watch ? 'Following user location' : 'Not following user location'} </li>
        <li>Latitude: {latitude}</li>
        <li>Longitude: {longitude}</li>
        <li>Timestamp: {timestamp}</li>
      </ul>
      {googleMapsResults && <GoogleResults data={googleMapsResults} />}
    </>
  );

  const renderError = ({ message }: { message: string }) => <h1 data-testid="error">{message}</h1>;

  const renderContent = () => (loading ? renderLoading() : renderGeoLocation());

  return <div>{error ? renderError({ message: error.message }) : renderContent()}</div>;
};
