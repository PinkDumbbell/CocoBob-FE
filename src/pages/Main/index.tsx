import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EffectCoverflow, Pagination } from 'swiper';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';

import { useGetUserQuery } from '@/store/api/userApi';
import { useLazyGetRecommendProductQuery } from '@/store/api/productApi';

import Layout from '@/components/layout/Layout';
import ContentsContainer from '@/components/ContentsContainer';

import { useCurrentPet } from '@/utils/hooks';

import doctorPng from '@/assets/image/main_background.png';
import doctorWebp from '@/assets/image/main_background.webp';
import dogIcon from '@/assets/icon/dog_icon.png';
import { ReactComponent as RecommendIcon } from '@/assets/icon/navbar_food.svg';

import { Spinner } from '@/Animation';

import {
  ContentSection,
  DoctorImageWrapper,
  HighlightText,
  MainContentSection,
  PageContainer,
  SectionSubtitle,
  SectionTitle,
  VerticalBox,
} from './index.style';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import MainContentButton from './components/MainContentButton';
import SwiperProductItem from './components/SwiperProductItem';
import DailySection from './components/DailySection';

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

export default function Main() {
  const navigate = useNavigate();
  const { data: pet, isError: currentPetError } = useCurrentPet();
  const { data } = useGetUserQuery();
  const [
    getRecommendProducts,
    { data: recommendedProducts, isSuccess, isLoading, isError: recommendError },
  ] = useLazyGetRecommendProductQuery();

  const goRegisterPetPage = () => navigate('/register');
  const goProductsRecommendPage = () => navigate('/products/recommend');

  const [recommendActiveIndex, setRecommendActiveIndex] = useState(0);

  const isFetchError = currentPetError || recommendError;
  useEffect(() => {
    if (data?.representativeAnimalId === null) {
      navigate('/register', {
        state: {
          isRepresentative: true,
        },
        replace: true,
      });
    }
  }, [data]);

  useEffect(() => {
    if (!pet?.id) return;
    getRecommendProducts({ petId: pet.id, type: 'aged' });
  }, [pet]);

  return (
    <Layout footer header title="펫탈로그" canSearch>
      <PageContainer>
        <MainContentSection>
          <DoctorImageWrapper>
            <picture>
              <source srcSet={doctorWebp} type="image/webp" />
              <img src={doctorPng} alt="메인 배경 이미지 1" className="scale-x-105" />
            </picture>
          </DoctorImageWrapper>
          <VerticalBox className="z-10 min-h-section">
            {pet?.name && (
              <>
                <SectionTitle>
                  <HighlightText>{pet.name ?? '반려동물 불러오기 실패'}</HighlightText>
                </SectionTitle>
                <SectionSubtitle>어떻게 지내고 있을까요?</SectionSubtitle>
              </>
            )}
            {isFetchError && (
              <>
                <SectionTitle>에러발생</SectionTitle>
                <SectionSubtitle>정보를 불러오지 못했습니다.</SectionSubtitle>
              </>
            )}
          </VerticalBox>
          <div className="-translate-y-5">
            <ContentsContainer>
              <DailySection />
            </ContentsContainer>
          </div>
        </MainContentSection>
        <div className="px-4 flex justify-between items-end">
          <SectionTitle>{pet?.name ?? 'OO'}에게 추천하는 사료에요</SectionTitle>
          <Link to="/products/recommend" className="text-caption text-gray cursor-pointer">
            더보기
          </Link>
        </div>
        <div className="w-full flex items-center h-72">
          <Swiper
            {...productSwiperOption}
            className="pt-4 pb-14"
            onActiveIndexChange={(swiper) => setRecommendActiveIndex(swiper.activeIndex)}
          >
            {isSuccess &&
              recommendedProducts?.productList.slice(10).map((product, idx) => (
                <SwiperSlide key={`main-${product.productId}`}>
                  <SwiperProductItem
                    product={product}
                    isActive={recommendActiveIndex === idx}
                    key={`main-${product.productId}`}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
          {isLoading && <Spinner />}
          {isFetchError && (
            <div className="py-10 text-center w-full text-lg font-medium">
              상품을 불러오지 못했습니다.
            </div>
          )}
        </div>
        <ContentSection>
          <MainContentButton
            label="맞춤 제품을 추천해드려요!"
            title="추천 제품 보러가기"
            onClick={goProductsRecommendPage}
            icon={<RecommendIcon width={32} stroke="#114786" />}
          />
          <MainContentButton
            label="소중한 가족을 소개해주세요"
            title="반려동물 등록하기"
            onClick={goRegisterPetPage}
            icon={<img src={dogIcon} alt="register_pet_icon" width={28} />}
          />
        </ContentSection>
      </PageContainer>
    </Layout>
  );
}
