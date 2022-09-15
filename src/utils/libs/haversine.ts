import { LocationType } from '@/@type/location';

export const toRadian = (num: number) => {
  return (num * Math.PI) / 180;
};
export const EARTH_RADIUS = 6371;

export const getHaversineDistance = (from: LocationType, to: LocationType) => {
  const lat = to.latitude - from.latitude;
  const lng = to.longitude - from.longitude;
  const dLat = toRadian(lat);
  const dLng = toRadian(lng);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadian(from.latitude)) * Math.cos(toRadian(to.latitude)) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = EARTH_RADIUS * c;
  return distance;
};
