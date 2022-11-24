import useAnimation from '@/utils/hooks/useAnimation';
import display from '@/Animation/OnBoarding/assets/display.json';
import { Container } from './index.style';

interface OnBoardingProps {
  index: number;
}

const OnBoardingAnimation = ({ index }: OnBoardingProps) => {
  const OnBoardAnimation = useAnimation(display, false, 40, 40);

  if (index === 0) return <Container {...OnBoardAnimation}></Container>;
  return <></>;
};

export default OnBoardingAnimation;
