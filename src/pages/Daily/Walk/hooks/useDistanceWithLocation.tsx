import { useEffect, useState } from 'react';
import { getHaversineDistance } from '@/utils/libs/haversine';
import { LocationType } from '@/@type/location';

type UseDistanceWithLocationProps = {
  location: LocationType;
  isRunning: boolean;
};
export default function useLocationDistance({ location, isRunning }: UseDistanceWithLocationProps) {
  const [distance, setDistance] = useState<number>(0);
  const [locationRecords, setLocationRecords] = useState<LocationType[]>([]);

  const resetDistance = () => {
    setDistance(0);
    setLocationRecords([]);
  };
  useEffect(() => {
    console.log(location.latitude, location.longitude, isRunning);
    if (!location || !isRunning) {
      console.log('!location || !isRunnign');
      return;
    }

    const lastLocation = locationRecords[locationRecords.length - 1];
    // km 단위
    if (!lastLocation) {
      console.log('not lastLocation');
      setLocationRecords((prev) => [...prev, location]);
      setDistance(0);
      return;
    }
    const hiversineDistance = getHaversineDistance(lastLocation, location);
    console.log('hiversine result', hiversineDistance);
    if (hiversineDistance >= 0.001) {
      // 3m 이상 움직였을 때 기록
      setLocationRecords((prev) => [...prev, location]);
      setDistance((prev) => Math.round((prev + hiversineDistance) * 1e2) / 1e2);
    }
  }, [location]);

  return {
    distance,
    locationRecords,
    resetDistance,
  };
}
