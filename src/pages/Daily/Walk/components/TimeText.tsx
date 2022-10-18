type TimeTextProps = {
  hours: number;
  minutes: number;
  seconds: number;
};
export default function TimeText({ hours, minutes, seconds }: TimeTextProps) {
  const hoursText = `${`0${hours}`.slice(-2)}:`;
  const minutesText = `0${minutes}`.slice(-2);
  const secondsText = `0${seconds}`.slice(-2);

  return (
    <p className="text-lg font-semibold text-primary-dark">
      {hours ? hoursText : ''}
      {minutesText}:{secondsText}
    </p>
  );
}
