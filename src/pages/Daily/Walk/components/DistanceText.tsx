type DistanceTextProps = {
  distance: number;
};
export default function DistanceText({ distance }: DistanceTextProps) {
  const isKM = distance >= 1;
  const distanceInMeter = distance * 1000;

  return (
    <p className="text-lg font-semibold text-primary-dark">
      {isKM ? (
        <span>
          {distance.toFixed(2)}
          <span className="text-black">km</span>
        </span>
      ) : (
        <span>
          {distanceInMeter}
          <span className="text-black">M</span>
        </span>
      )}
    </p>
  );
}
