import React, { useEffect } from 'react';
import { useGeoLocation } from 'useGeoLocation';
import { GeoLocationOptions } from 'use-geo-location';

export const Demo = ({ watch = false }: { watch?: boolean }) => {
  const options: GeoLocationOptions = {
    watch,
    apiKey: 'AIzaSyBYY6vxi0iXxDiRSyVRzd6lwVIcbFdKswU',
  };
  const { latitude, longitude, timestamp, loading, error, googleMapsResults } = useGeoLocation(options);

  useEffect(() => {
    console.log(googleMapsResults);
  }, [googleMapsResults]);

  const renderLoading = () => <h1 data-testid="loading">Loading...</h1>;

  const renderGeoLocation = () => (
    <ul data-testid="geo-location">
      <li>Watching: {watch ? 'Following user location' : 'Not following user location'} </li>
      <li>Latitude: {latitude}</li>
      <li>Longitude: {longitude}</li>
      <li>Timestamp: {timestamp}</li>
    </ul>
  );

  const renderError = ({ message }: { message: string }) => <h1 data-testid="error">{message}</h1>;

  const renderContent = () => (loading ? renderLoading() : renderGeoLocation());

  return <div>{error ? renderError({ message: error.message }) : renderContent()}</div>;
};
