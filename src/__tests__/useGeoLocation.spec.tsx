import React from 'react';
import { render, waitFor, wait } from '@testing-library/react';
import { Demo } from '../../demo/demo';

const mockPosition = {
  coords: {
    latitude: 37.8136,
    longitude: 144.9631,
    accuracy: 24,
  },
  timestamp: 1594775252,
};

const mockGeolocation = {
  watchPosition: (onChange: jest.Mock) => {
    onChange(mockPosition);
    return 1;
  },
  getCurrentPosition: (onChange: jest.Mock) => onChange(mockPosition),
  clearWatch: jest.fn(),
};

const mockGeolocationError = {
  watchPosition: (onChange: jest.Mock, onError: jest.Mock) => onError(new Error('User denied Geolocation')),
  getCurrentPosition: (onChange: jest.Mock, onError: jest.Mock) => onError(new Error('User denied Geolocation')),
  clearWatch: jest.fn(),
};

describe('Testing demo page', () => {
  test('renders user location', () => {
    // @ts-ignore
    navigator.geolocation = mockGeolocation;
    const { getByTestId } = render(<Demo />);
    expect(getByTestId('geo-location')).toBeVisible();
  });

  test('renders error message', () => {
    // @ts-ignore
    navigator.geolocation = mockGeolocationError;
    const { getByTestId } = render(<Demo />);
    expect(getByTestId('error')).toBeVisible();
  });

  test('renders error message when geo location is not supported', () => {
    // @ts-ignore
    navigator.geolocation = null;
    const { getByTestId } = render(<Demo />);
    expect(getByTestId('error')).toBeVisible();
    expect(getByTestId('error').innerHTML).toEqual('Geolocation not available');
  });
});
