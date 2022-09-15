import { render } from '@testing-library/react';
import DistanceText from './DistanceText';

describe('<DistanceText/>', () => {
  const getMeterDistance = (kmValue: number) => kmValue * 1000;

  test('M 값 테스트', () => {
    const distanceValue = 0.92; // 0.92km
    const distanceValueInMeter = getMeterDistance(distanceValue);

    const button = render(<DistanceText distance={distanceValue} />);

    const renderedText = button.getByText('M').previousSibling?.textContent;
    expect(renderedText).toBe(distanceValueInMeter.toString());
  });
  test('KM 값 테스트', () => {
    const distanceValue = 1.2345; // 1.2345km
    const distanceFixedTwo = distanceValue.toFixed(2); // 1.23km

    const button = render(<DistanceText distance={distanceValue} />);

    const renderedText = button.getByText('km').previousSibling?.textContent;
    expect(renderedText).toBe(distanceFixedTwo);
  });
});
