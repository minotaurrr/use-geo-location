declare module 'use-geo-location' {
  export interface Config {
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
    googleMapsLocation?: GoogleMapsResults;
  }

  export interface GoogleMapsResults {
    plus_code: any;
    status: string;
    results: any[];
  }

  export interface GeoLocationOptions {
    watch?: boolean;
    config?: Config;
    apiKey?: string;
  }

  function useGeoLocation(options?: GeoLocationOptions): Location;

  type CountryCode =
    | 'af'
    | 'ja'
    | 'sq'
    | 'kn'
    | 'am'
    | 'kk'
    | 'ar'
    | 'km'
    | 'hy'
    | 'ko'
    | 'az'
    | 'ky'
    | 'eu'
    | 'lo'
    | 'be'
    | 'lv'
    | 'bn'
    | 'lt'
    | 'bs'
    | 'mk'
    | 'bg'
    | 'ms'
    | 'my'
    | 'ml'
    | 'ca'
    | 'mr'
    | 'zh'
    | 'mn'
    | 'zh-CN'
    | 'ne'
    | 'zh-HK'
    | 'no'
    | 'zh-TW'
    | 'pl'
    | 'hr'
    | 'pt'
    | 'cs'
    | 'pt-BR'
    | 'da'
    | 'pt-PT'
    | 'nl'
    | 'pa'
    | 'en'
    | 'ro'
    | 'en-AU'
    | 'ru'
    | 'en-GB'
    | 'sr'
    | 'et'
    | 'si'
    | 'fa'
    | 'sk'
    | 'fi'
    | 'sl'
    | 'es'
    | 'fr'
    | 'fr-CA'
    | 'sw'
    | 'gl'
    | 'sv'
    | 'ka'
    | 'ta'
    | 'de'
    | 'te'
    | 'el'
    | 'th'
    | 'gu'
    | 'tr'
    | 'iw'
    | 'uk'
    | 'hi'
    | 'ur'
    | 'hu'
    | 'uz'
    | 'is'
    | 'vi'
    | 'id'
    | 'zu'
    | 'it';

  interface Components {
    postalCode?: string;
    country?: CountryCode;
  }
}
