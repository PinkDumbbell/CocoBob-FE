import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import { EffectCards, Pagination } from 'swiper';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import { Dispatch, SetStateAction, useState } from 'react';

import Layout from '@/components/layout/Layout';
import { Button } from '@/components/Button/';
import { OnBoardingContainer } from './index.style';
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
  setNext: Dispatch<SetStateAction<boolean>>;
}

export default function OnBoardingPage(props: OnBoardingType) {
  const { setNext } = props;
  const [last, setLast] = useState(false);
  const onNext = () => setNext(true);

  return (
    <Layout
      header
      hideTitle
      customRightChild={
        !last && (
          <div className="cursor-pointer" onClick={onNext}>
            건너뛰기
          </div>
        )
      }
    >
      <OnBoardingContainer>
        <Swiper
          className="h-[calc(100%-70px)]"
          onReachEnd={() => setLast(true)}
          {...OnBoardingProps}
        >
          {OnBoardingData.map((data, idx) => (
            <SwiperSlide
              key={idx}
              className="flex flex-col gap-1 justify-center items-center pt-10"
            >
              <h3 className="text-primary mb-5">{data.title}</h3>
              <p className="text-secondary">{data.sub}</p>
              <p className="text-secondary">{data.sub2}</p>
              <div className="mt-10 mb-40 bg-primary-max h-80">{data.animate}</div>
            </SwiperSlide>
          ))}
        </Swiper>
        <Button
          onClick={onNext}
          className={last ? 'visible' : 'invisible'}
          width="full"
          label="시작하기"
        />
      </OnBoardingContainer>
    </Layout>
  );
}
