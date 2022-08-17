/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGetUserQuery } from '@/store/api/userApi';
import useLogout from '@/utils/hooks/useLogout';
import useCurrentPet from '@/utils/hooks/useCurrentPet';
import Layout from '@/components/layout/Layout';
import ContentsContainer from '@/components/ContentsContainer';
import doctor from '@/assets/image/main_doctor.png';
import productDummy from '@/assets/image/product_dummy.png';
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { EffectCoverflow, Pagination } from 'swiper';

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
import SwiperProductItem from './components/SwiperProductItem';
import MainContentButton from './components/MainContentButton';

export default function Main() {
  const navigate = useNavigate();
  const { data: pet } = useCurrentPet();
  const { data } = useGetUserQuery();
  const [activeIndex, setActiveIndex] = useState(0);

  const onClickLogout = useLogout();
  const goRegisterPetPage = () => navigate('/register');

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

  return (
    <Layout footer header title="펫탈로그" menu canSearch>
      <PageContainer>
        <MainContentSection>
          <DoctorImageWrapper>
            <img src={doctor} alt="메인 배경 이미지 1" className="w-full" />
          </DoctorImageWrapper>
          <VerticalBox className="z-10">
            <SectionTitle>
              <HighlightText>{pet?.name ?? '반려동물 불러오기 실패'}</HighlightText>
            </SectionTitle>
            <SectionSubtitle>어떻게 지내고 있을까요?</SectionSubtitle>
          </VerticalBox>

          <ContentsContainer style={{ zIndex: 10 }}>
            <div className="w-full h-auto flex justify-evenly gap-3 relative">
              <VerticalCenterBox className="bg-gray-300 rounded-md w-1/3 aspect-square">
                사료
              </VerticalCenterBox>
              <VerticalCenterBox className="bg-gray-300 rounded-md w-1/3 aspect-square">
                생활기록
              </VerticalCenterBox>
              <VerticalCenterBox className="bg-gray-300 rounded-md w-1/3 aspect-square">
                보고서
              </VerticalCenterBox>
            </div>
          </ContentsContainer>
        </MainContentSection>
        <VerticalBox>
          <div className="flex items-end justify-between px-4">
            <SectionTitle>{pet?.name}에게 추천하는 사료에요!</SectionTitle>
            <Link to="/products/recommend">더보기</Link>
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
              onActiveIndexChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            >
              {Array(8)
                .fill(0)
                .map((_, idx) => (
                  <SwiperSlide key={idx}>
                    <SwiperProductItem
                      productId={idx}
                      path={productDummy}
                      brand="로얄캐닌"
                      isActive={activeIndex === idx}
                      isLiked={idx % 2 === 0}
                      name="미니언도어 애견사료"
                      price={84720}
                      key={idx}
                    />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </VerticalBox>

        <ContentSection>
          <MainContentButton title="로그아웃하기" onClick={onClickLogout} />
        </ContentSection>
        <ContentSection>
          <MainContentButton
            label="소중한 가족을 소개해주세요"
            title="반려동물 등록하기"
            onClick={goRegisterPetPage}
          />
        </ContentSection>
        <ContentSection>
          <MainContentButton label="현재 사료는 잘 주고 계신가요?" title="영양분석하기" />
        </ContentSection>
      </PageContainer>
    </Layout>
  );
}
