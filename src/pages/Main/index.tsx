import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EffectCoverflow, Pagination } from 'swiper';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';

import { useGetUserQuery } from '@/store/api/userApi';
import { useLazyGetRecommendProductQuery } from '@/store/api/productApi';

import Layout from '@/components/layout/Layout';
import ContentsContainer from '@/components/ContentsContainer';

import { useLogout, useCurrentPet } from '@/utils/hooks';

import doctor from '@/assets/image/main_doctor.png';
import { ReactComponent as RecommendIcon } from '@/assets/icon/navbar_food.svg';
import { ReactComponent as TrashIcon } from '@/assets/icon/trash_icon.svg';
import { ReactComponent as DogFoodIcon } from '@/assets/icon/dog_food.svg';
import {
  ContentSection,
  DoctorImageWrapper,
  HighlightText,
  MainContentSection,
  PageContainer,
  SectionSubtitle,
  SectionTitle,
  VerticalBox,
  VerticalCenterBox,
} from './index.style';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import MainContentButton from './components/MainContentButton';
import SwiperProductItem from './components/SwiperProductItem';

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
  const onClickLogout = useLogout();
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
    <Layout footer header title="펫탈로그" menu canSearch>
      <PageContainer>
        <MainContentSection>
          <DoctorImageWrapper>
            <img src={doctor} alt="메인 배경 이미지 1" className="w-full" />
          </DoctorImageWrapper>
          <VerticalBox className="z-10 min-h-[50px]">
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
          <ContentsContainer style={{ zIndex: 10 }}>
            <div className="w-full h-auto flex justify-evenly gap-3 relative">
              <VerticalCenterBox className="bg-gray-300 rounded-md w-1/3 aspect-square">
                <Link to="/products" className="w-full h-full flex items-center justify-center">
                  사료찾기
                </Link>
              </VerticalCenterBox>
              <VerticalCenterBox className="bg-gray-300 rounded-md w-1/3 aspect-square">
                <Link to="/daily" className="w-full h-full flex items-center justify-center">
                  생활기록
                </Link>
              </VerticalCenterBox>
              <VerticalCenterBox className="bg-gray-300 rounded-md w-1/3 aspect-square">
                보고서
              </VerticalCenterBox>
            </div>
          </ContentsContainer>
        </MainContentSection>
        <div className="px-4 flex justify-between items-end">
          <SectionTitle>{pet?.name ?? 'OO'}에게 추천하는 사료에요</SectionTitle>
          <Link to="/products/recommend" className="text-sm">
            더보기
          </Link>
        </div>
        <div className="w-full flex items-center">
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
          {isLoading && (
            <div className="text-center w-full text-lg font-medium">상품을 불러오는 중 입니다.</div>
          )}
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
            icon={<RecommendIcon width={29} />}
          />
          <MainContentButton
            label="소중한 가족을 소개해주세요"
            title="반려동물 등록하기"
            onClick={goRegisterPetPage}
            icon={<div className="w-[29px] text-xl text-center">+</div>}
          />
          <MainContentButton
            label="현재 사료는 잘 주고 계신가요?"
            title="영양분석하기"
            icon={<DogFoodIcon width={29} />}
          />
          <MainContentButton
            title="로그아웃하기"
            onClick={onClickLogout}
            icon={<TrashIcon width={29} />}
          />
        </ContentSection>
      </PageContainer>
    </Layout>
  );
}
