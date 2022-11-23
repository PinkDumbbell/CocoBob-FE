import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCards, Pagination } from 'swiper';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import Layout from '@/components/layout/Layout';
import { Dispatch, SetStateAction, useState } from 'react';
import { Button } from '@/components/Button/';

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

const OnBoardingData = [
  { title: '타이틀', sub: '설명입니다.', sub2: '설명입니다2', animate: '애니메이션입니다.' },
  { title: '타이틀', sub: '설명입니다.', sub2: '설명입니다2', animate: '애니메이션입니다.' },
  { title: '타이틀', sub: '설명입니다.', sub2: '설명입니다2', animate: '애니메이션입니다.' },
];

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
      <section className="block w-auto mx-4 h-full">
        <Swiper
          className="h-[calc(100%-70px)]"
          onReachEnd={() => setLast(true)}
          {...OnBoardingProps}
        >
          {OnBoardingData.map((data, idx) => (
            <SwiperSlide
              key={idx}
              className="flex flex-col gap-3 justify-center items-center pt-10"
            >
              <h3 className="text-primary">{data.title}</h3>
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
      </section>
    </Layout>
  );
}
