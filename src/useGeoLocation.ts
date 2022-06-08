import { useState, useEffect } from 'react';
import { Config, GoogleMapsResults, Position } from 'use-geo-location';
import GoogleMaps from 'googleMaps';

const defaultConfig: Config = {
  enableHighAccuracy: false,
  timeout: 10000,
  maximumAge: 10000,
};

export const useGeoLocation = ({
  watch = true,
  config = defaultConfig,
  apiKey = undefined,
}: {
  watch?: boolean;
  config?: Config;
  apiKey?: string;
} = {}) => {
  const [latitude, setLatitude] = useState<number | undefined>();
  const [longitude, setLongitude] = useState<number | undefined>();
  const [timestamp, setTimestamp] = useState<number | undefined>();
  const [error, setError] = useState<GeolocationPositionError | Error>();
  const [loading, setLoading] = useState(false);
  const [googleMapsResults, setGoogleMapsResults] = useState<GoogleMapsResults>();

  useEffect(() => {
    setLoading(true);
    const geo = navigator.geolocation;

    if (!geo) {
      const error = new Error('Geolocation not available');
      setLoading(false);
      return setError(error);
    }

    const onSuccess: PositionCallback = async (pos: Position) => {
      const { latitude, longitude } = pos.coords;
      setLatitude(latitude);
      setLongitude(longitude);
      setError(undefined);
      setTimestamp(pos.timestamp);
      if (apiKey) {
        const gm = new GoogleMaps({ apiKey });
        try {
          const res = await gm.searchByLatLon({ latitude, longitude });
          setGoogleMapsResults(res);
        } catch (err) {
          setError(err as Error);
        }
      }
      setLoading(false);
    };

    const onError: PositionErrorCallback = (err: GeolocationPositionError) => {
      setError(err);
      setLoading(false);
    };

    let watcher: number | null = null;
    if (watch) {
      watcher = geo.watchPosition(onSuccess, onError, config);
    } else {
      geo.getCurrentPosition(onSuccess, onError, config);
    }

    return () => {
      watcher && geo.clearWatch(watcher);
    };
  }, [watch, config, apiKey]);

  return { latitude, longitude, timestamp, loading, error, googleMapsResults };
};
