declare module 'use-geo-location' {
  interface Config {
    enableHighAccuracy: boolean;
    timeout: number;
    maximumAge: number;
  }

  interface Location {
    latitude: number;
    longitude: number;
    loading: boolean;
    error: PositionError;
    timestamp: number;
  }

  function useGeoLocation({ watch, config }: { watch?: boolean; config?: Config } = {}): Location;
}
