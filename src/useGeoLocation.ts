import { useState, useEffect } from 'react';
import { Config } from 'use-geo-location';

const defaultConfig: Config = {
  enableHighAccuracy: false,
  timeout: 10000,
  maximumAge: 0,
};

// TODO: add google maps support to get state value from coords
export const useGeoLocation = ({ watch = false, config = defaultConfig }: { watch?: boolean; config?: Config } = {}) => {
  const [latitude, setLatitude] = useState<number | undefined>();
  const [longitude, setLongitude] = useState<number | undefined>();
  const [timestamp, setTimestamp] = useState<number | undefined>();
  const [error, setError] = useState<PositionError | undefined>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('render');
    setLoading(true);
    const geo = navigator.geolocation;

    if (!geo) {
      const positionError: PositionError = {
        code: -1,
        message: 'Geolocation not available',
        PERMISSION_DENIED: 1,
        POSITION_UNAVAILABLE: 2,
        TIMEOUT: 3,
      };
      setLoading(false);
      return setError(positionError);
    }

    const onSuccess: PositionCallback = (pos: Position) => {
      const { latitude, longitude } = pos.coords;
      setLatitude(latitude);
      setLongitude(longitude);
      setError(undefined);
      setLoading(false);
      setTimestamp(pos.timestamp);
    };

    const onError: PositionErrorCallback = (err: PositionError) => {
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
  }, [watch, config]);

  return { latitude, longitude, timestamp, loading, error };
};
