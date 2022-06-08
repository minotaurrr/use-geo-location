import GoogleMaps from '../googleMaps';

describe('Google Maps API', () => {
  test('API returns error when invalid key is provided', async () => {
    const gm = new GoogleMaps({ apiKey: '1234' });
    try {
      await gm.searchByLatLon({ latitude: 1, longitude: 1 });
    } catch (err) {
      expect((err as Error).message).toEqual('REQUEST_DENIED');
    }
  });
});
