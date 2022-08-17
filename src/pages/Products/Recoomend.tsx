/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import { EffectCoverflow, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Layout from '@/components/layout/Layout';
import { useGetRecommendProductQuery } from '@/store/api/productApi';
import useCurrentPet from '@/utils/hooks/useCurrentPet';
import SwiperProductItem from '../Main/components/SwiperProductItem';
import { SectionTitle, VerticalBox } from '../Main/index.style';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

export default function RecommendProducts() {
  const { data: pet, isSuccess: petSuccess } = useCurrentPet();
  const secondRecommendationTitle = pet?.isPregnant
    ? `임신 중인 ${pet.name}에게 적합한 사료에요!`
    : 'AFFCO 기준을 만족하는 사료에요!';
  const [activeIndexOfAged, setActiveIndexOfAged] = useState(0);
  const [activeIndexOfPregnancy, setActiveIndexOfPregnancy] = useState(0);
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

  return (
    <Layout header title="추천 제품" canGoBack canSearch>
      <div className="px-5 py-2 space-y-4">
        <VerticalBox>
          <div className="flex items-end justify-between px-4">
            <SectionTitle>{pet?.name}의 나이에 적합한 사료에요!</SectionTitle>
          </div>
          <div className="w-full flex items-center">
            <Swiper
              coverflowEffect={{
                rotate: 0,
                stretch: -18,
                modifier: 1,
                slideShadows: false,
              }}
              grabCursor={true}
              effect={'coverflow'}
              pagination={{
                clickable: true,
              }}
              centeredSlides={true}
              modules={[EffectCoverflow, Pagination]}
              slidesPerView={3}
              className="pt-4 pb-14"
              onActiveIndexChange={(swiper) => setActiveIndexOfAged(swiper.activeIndex)}
            >
              {agedLoading ? (
                'Loading...'
              ) : agedSuccess ? (
                agedProducts.productList.slice(10).map((product, idx) => (
                  <SwiperSlide key={idx}>
                    <SwiperProductItem
                      product={product}
                      isActive={activeIndexOfAged === idx}
                      key={`aged-${product.productId}`}
                    />
                  </SwiperSlide>
                ))
              ) : (
                <div>Failed to load...</div>
              )}
            </Swiper>
          </div>
        </VerticalBox>
        <VerticalBox>
          <div className="flex items-end justify-between px-4">
            <SectionTitle>{secondRecommendationTitle}</SectionTitle>
          </div>
          <div className="w-full flex items-center">
            <Swiper
              coverflowEffect={{
                rotate: 0,
                stretch: -18,
                modifier: 1,
                slideShadows: false,
              }}
              grabCursor={true}
              effect={'coverflow'}
              pagination={{
                clickable: true,
              }}
              centeredSlides={true}
              modules={[EffectCoverflow, Pagination]}
              slidesPerView={3}
              className="pt-4 pb-14"
              onActiveIndexChange={(swiper) => setActiveIndexOfPregnancy(swiper.activeIndex)}
            >
              {pregnancyLoading ? (
                'Loading...'
              ) : pregnancySuccess ? (
                pregnancyProducts.productList.slice(10).map((product, idx) => (
                  <SwiperSlide key={idx}>
                    <SwiperProductItem
                      product={product}
                      isActive={activeIndexOfPregnancy === idx}
                      key={`aged-${product.productId}`}
                    />
                  </SwiperSlide>
                ))
              ) : (
                <div>Failed to load...</div>
              )}
            </Swiper>
          </div>
        </VerticalBox>
      </div>
    </Layout>
  );
}
