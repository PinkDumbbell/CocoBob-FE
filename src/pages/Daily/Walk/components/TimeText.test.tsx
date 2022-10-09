import { render } from '@testing-library/react';
import TimeText from './TimeText';

describe('<TimeText/>', () => {
  const getTime = (hours: number, minutes: number, seconds: number) => ({
    hours,
    minutes,
    seconds,
  });
  test('시, 분, 초 확인', () => {
    const time = getTime(1, 8, 40);
    const textElement = render(
      <TimeText hours={time.hours} minutes={time.minutes} seconds={time.seconds} />,
    );
    // eslint-disable-next-line no-octal
    const renderedText = textElement.getByText('01:08:40');
    expect(renderedText).toBeInTheDocument();
  });
  test('분, 초 확인', () => {
    const time = getTime(0, 28, 9);
    const textElement = render(
      <TimeText hours={time.hours} minutes={time.minutes} seconds={time.seconds} />,
    );

    const renderedText = textElement.getByText('28:09');
    expect(renderedText).toBeInTheDocument();
  });
});
