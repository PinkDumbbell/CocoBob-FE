/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-nested-ternary */
import { useEffect, useMemo, useState } from 'react';
import { EffectCoverflow, Pagination } from 'swiper';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import Layout from '@/components/layout/Layout';
import { useGetRecommendProductQuery } from '@/store/api/productApi';
import useCurrentPet from '@/utils/hooks/useCurrentPet';
import SwiperProductItem from '../Main/components/SwiperProductItem';
import { SectionTitle, VerticalBox } from '../Main/index.style';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const productSwiperOption: SwiperProps = {
  effect: 'coverflow',
  coverflowEffect: {
    rotate: 0,
    stretch: -18,
    modifier: 1,
    slideShadows: false,
  },
  grabCursor: true,
  centeredSlides: true,
  modules: [EffectCoverflow, Pagination],
  slidesPerView: 3,
  pagination: { clickable: true },
};

export default function RecommendProducts() {
  const { data: pet, isSuccess: petSuccess } = useCurrentPet();

  const [swiperActiveIndexOfAged, setSwiperActiveIndexOfAged] = useState(0);
  const [swiperActiveIndexOfPregnancy, setSwiperActiveIndexOfPregnancy] = useState(0);

  const {
    data: agedProducts,
    isLoading: agedLoading,
    isSuccess: agedSuccess,
    refetch: agedRefetch,
  } = useGetRecommendProductQuery({ type: 'aged', petId: pet?.id }, { skip: !!!pet?.id });
  const {
    data: pregnancyProducts,
    isLoading: pregnancyLoading,
    isSuccess: pregnancySuccess,
    refetch: pregnancyRefetch,
  } = useGetRecommendProductQuery({ type: 'pregnancy', petId: pet?.id }, { skip: !!!pet?.id });

  useEffect(() => {
    if (!petSuccess || !pet) return;
    agedRefetch();
    pregnancyRefetch();
  }, [petSuccess]);

  const secondRecommendationTitle = useMemo(
    () =>
      pet?.isPregnant
        ? `임신 중인 ${pet.name}에게 적합한 사료에요!`
        : 'AFFCO 기준을 만족하는 사료에요!',
    [pet?.isPregnant],
  );

  return (
    <Layout header title="추천 제품" canGoBack canSearch>
      <div className="px-5 py-2 space-y-4">
        <VerticalBox>
          <div className="flex items-end justify-between px-2">
            <SectionTitle>{pet?.name}의 나이에 적합한 사료에요!</SectionTitle>
          </div>
          <div className="w-full flex items-center">
            <Swiper
              {...productSwiperOption}
              className="pt-4 pb-14"
              onActiveIndexChange={(swiper) => setSwiperActiveIndexOfAged(swiper.activeIndex)}
            >
              {agedLoading ? (
                'Loading...'
              ) : agedSuccess ? (
                agedProducts.productList.slice(10).map((product, idx) => (
                  <SwiperSlide key={`aged-${product.productId}`}>
                    <SwiperProductItem
                      product={product}
                      isActive={swiperActiveIndexOfAged === idx}
                      key={`aged-${product.productId}`}
                    />
                  </SwiperSlide>
                ))
              ) : (
                <div className="text-center w-full text-2xl font-medium">
                  상품을 불러오는데 문제가 발생하였습니다.
                </div>
              )}
            </Swiper>
          </div>
        </VerticalBox>
        <VerticalBox>
          <div className="flex items-end justify-between px-2">
            <SectionTitle>{secondRecommendationTitle}</SectionTitle>
          </div>
          <div className="w-full flex items-center">
            <Swiper
              {...productSwiperOption}
              className="pt-4 pb-14"
              onActiveIndexChange={(swiper) => setSwiperActiveIndexOfPregnancy(swiper.activeIndex)}
            >
              {pregnancyLoading ? (
                'Loading...'
              ) : pregnancySuccess ? (
                pregnancyProducts.productList.slice(10).map((product, idx) => (
                  <SwiperSlide key={`pregnancy-${product.productId}`}>
                    <SwiperProductItem
                      product={product}
                      isActive={swiperActiveIndexOfPregnancy === idx}
                      key={`aged-${product.productId}`}
                    />
                  </SwiperSlide>
                ))
              ) : (
                <div className="text-center w-full text-2xl font-medium">
                  상품을 불러오는데 문제가 발생하였습니다.
                </div>
              )}
            </Swiper>
          </div>
        </VerticalBox>
      </div>
    </Layout>
  );
}
