import React from 'react';
import { useGeoLocation } from 'useGeoLocation';

export const Demo = ({ watch = true }: { watch?: boolean }) => {
  const { latitude, longitude, timestamp, loading, error } = useGeoLocation();

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
