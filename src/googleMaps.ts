import axios from 'axios';
import { Components, GoogleMapsResults } from 'use-geo-location';

class GoogleMaps {
  private API_KEY: string;
  private GOOGLE_API: string = 'https://maps.googleapis.com/maps/api/geocode/json';

  constructor({ apiKey }: { apiKey: string }) {
    this.API_KEY = apiKey;
  }

  buildComponents(components: Components) {
    const arr = [];
    for (const [key, val] of Object.entries(components)) {
      arr.push(`${key}:${val}`);
    }

    return arr.join('|');
  }

  async getResults(url: string): Promise<GoogleMapsResults> {
    try {
      const { data } = await axios.get(url);

      if (data.status.toLowerCase() !== 'ok') {
        throw new Error(data.status);
      } else {
        return data;
      }
    } catch (err) {
      throw err;
    }
  }

  async searchByAddress({ address, components }: { address: string; components?: Components }) {
    const url = `${this.GOOGLE_API}?address=${encodeURIComponent(address)}&key=${this.API_KEY}${
      components && `&components=${this.buildComponents(components)}`
    }`;

    return await this.getResults(url);
  }

  async searchByLatLon({ latitude, longitude }: { latitude: number; longitude: number }) {
    const url = `${this.GOOGLE_API}?latlng=${`${latitude},${longitude}`}&key=${this.API_KEY}`;

    return await this.getResults(url);
  }
}

export default GoogleMaps;
