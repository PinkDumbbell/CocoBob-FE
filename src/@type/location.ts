export interface ILocation {
  latitude: number;
  longitude: number;
}
export interface IGeolocationOptions {
  enableHighAccuracy?: boolean;
  maximumAge?: number;
  timeout?: number;
}
