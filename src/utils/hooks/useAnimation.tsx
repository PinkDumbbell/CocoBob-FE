import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

const useAnimation = (
  data: any,
  isLoop: boolean,
  setWidth: number,
  setHeight: number,
  speed: number = 1,
) => {
  const DOM = useRef<any>();

  useEffect(() => {
    lottie.loadAnimation({
      container: DOM.current,
      renderer: 'svg',
      loop: isLoop,
      autoplay: true,
      animationData: data,
    });
    lottie.setSpeed(speed);
  }, []);

  return {
    ref: DOM,
    style: {
      width: `${setWidth}rem`,
      height: `${setHeight}rem`,
    },
    className: 'animation',
  };
};

export default useAnimation;
