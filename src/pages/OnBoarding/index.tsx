import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import { EffectCards, Pagination } from 'swiper';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import { Dispatch, SetStateAction, useState, useRef, useEffect } from 'react';

import Layout from '@/components/layout/Layout';
import { Button } from '@/components/Button/';
import lottie from 'lottie-web';
import display from '@/Animation/OnBoarding/assets/display.json';
import display2 from '@/Animation/OnBoarding/assets/display2.json';
import display3 from '@/Animation/OnBoarding/assets/display3.json';
import { OnBoardingContainer, AnimationContainer } from './index.style';

import { OnBoardingData } from './index.constant';

const OnBoardingProps: SwiperProps = {
  effect: 'coverflow',
  coverflowEffect: {
    rotate: 0,
    modifier: 1,
    slideShadows: false,
  },
  spaceBetween: 50,
  grabCursor: true,
  centeredSlides: true,
  modules: [EffectCards, Pagination],
  slidesPerView: 1,
  pagination: { clickable: true },
};

interface OnBoardingType {
  closeOnBoardingScreen: Dispatch<SetStateAction<boolean>>;
}

export default function OnBoardingScreen(props: OnBoardingType) {
  const { closeOnBoardingScreen } = props;
  const [last, setLast] = useState(false);
  const isOnboardingShown = () => closeOnBoardingScreen(false);

  const animationContainerRef = useRef<HTMLDivElement[]>([]);
  const animationData = [display, display2, display3];

  useEffect(() => {
    if (!last) {
      animationData.forEach((el, idx) => {
        lottie.loadAnimation({
          container: animationContainerRef.current[idx],
          renderer: 'svg',
          loop: false,
          autoplay: idx === 0,
          name: `part${idx}`,
          animationData: el,
        });
      });
    }
  });

  return (
    <Layout
      header
      hideTitle
      customRightChild={
        !last && (
          <div className="cursor-pointer" onClick={isOnboardingShown}>
            건너뛰기
          </div>
        )
      }
    >
      <OnBoardingContainer>
        <Swiper
          {...OnBoardingProps}
          onSlideChange={(val) => {
            if (val.activeIndex === 1) return lottie.play('part1');
            if (val.activeIndex === 2) return lottie.play('part2');
            return lottie.play('part0');
          }}
          className="h-[calc(100%-70px)]"
          onReachEnd={() => setLast(true)}
        >
          {OnBoardingData.map((data, idx) => (
            <SwiperSlide
              key={idx}
              className="flex flex-col gap-1 justify-center items-center pt-10"
            >
              <h3 className="text-primary mb-5">{data.title}</h3>
              <p className="text-secondary">{data.sub}</p>
              <p className="text-secondary">{data.sub2}</p>
              <AnimationContainer
                {...{
                  ref: (el: any) => {
                    animationContainerRef.current[idx] = el;
                  },
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <Button
          onClick={isOnboardingShown}
          className={last ? 'visible' : 'invisible'}
          width="full"
          label="시작하기"
        />
      </OnBoardingContainer>
    </Layout>
  );
}
