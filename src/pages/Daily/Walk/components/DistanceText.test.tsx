import { render } from '@testing-library/react';
import DistanceText from './DistanceText';

describe('<DistanceText/>', () => {
  const getMeterDistance = (kmValue: number) => kmValue * 1000;

  test('M 값 테스트', () => {
    const distanceValue = 0.92; // 0.92km
    const distanceValueInMeter = getMeterDistance(distanceValue);

    const textElement = render(<DistanceText distance={distanceValue} />);

    const renderedText = textElement.getByText('M').previousSibling?.textContent;
    expect(renderedText).toBe(distanceValueInMeter.toString());
  });
  test('KM 값 테스트', () => {
    const distanceValue = 1.23456; // 1.23456km
    const distanceFixedTwo = distanceValue.toFixed(2); // 1.23km

    const textElement = render(<DistanceText distance={distanceValue} />);

    const renderedText = textElement.getByText('km').previousSibling?.textContent;
    expect(renderedText).toBe(distanceFixedTwo);
  });
});
