import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetUserQuery } from '@/store/api/userApi';
import useLogout from '@/utils/hooks/useLogout';
import Layout from '@/components/layout/Layout';
import ContentsContainer from '@/components/ContentsContainer';
import doctor from '@/assets/image/main_doctor.png';
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { EffectCoverflow, Pagination } from 'swiper';

import {
  ContentSection,
  DoctorImageWrapper,
  HighlightText,
  HorizontalBox,
  HorizontalCenterBox,
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

const ProductItem = () => (
  <div className="relative w-32 h-48">
    <ContentsContainer>
      <VerticalBox className="flex-1 justify-between">
        <div className="flex-1 bg-gray-200 rounded-md"></div>
        <div className="py-1 space-y-1">
          <VerticalBox>
            <p className="text-sm">로얄캐닌어덜트</p>
            <p className="text-xs">미니인도어 애견사료</p>
          </VerticalBox>
          <div className="flex justify-between">
            <span className="text-xs">88,740</span>
            <span className="text-xs">+</span>
          </div>
        </div>
      </VerticalBox>
    </ContentsContainer>
  </div>
);
export default function Main() {
  const navigate = useNavigate();
  const { data } = useGetUserQuery();

  const onClickLogout = useLogout();
  const goRegisterPetPage = () => navigate('/register');

  useEffect(() => {
    if (data?.representativeAnimalId === null) {
      navigate('/register', {
        state: {
          isRepresentative: true,
        },
      });
    }
  }, [data]);

  return (
    <Layout footer header title="펫탈로그" menu search onClickSearch={() => alert('준비중입니다.')}>
      <PageContainer>
        <MainContentSection>
          <DoctorImageWrapper>
            <img src={doctor} alt="메인 배경 이미지 1" />
          </DoctorImageWrapper>
          <VerticalBox className="z-10">
            <SectionTitle>
              <HighlightText>{data?.name}</HighlightText>
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
          <SectionTitle className="px-4 py-2">{data?.name}에게 추천하는 사료에요!</SectionTitle>
          <div className="w-full flex items-center">
            <Swiper
              coverflowEffect={{
                rotate: 30,
                stretch: 0,
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
              spaceBetween={10}
              slidesPerView={3}
              className="pt-4 pb-10"
            >
              {Array(8)
                .fill(0)
                .map((_, idx) => (
                  <SwiperSlide key={idx}>
                    <ProductItem />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </VerticalBox>

        <ContentSection>
          <ContentsContainer>
            <HorizontalBox className="w-full">
              <HorizontalCenterBox className="h-full aspect-square p-4">
                <span className="text-3xl rounded-full bg-primary-bright text-white aspect-square w-full items-center flex justify-center">
                  -
                </span>
              </HorizontalCenterBox>
              <div className="flex items-center w-full justify-evenly">
                <div onClick={onClickLogout}>
                  <p className="text-sm">로그아웃 테스트용 버튼</p>
                  <SectionSubtitle>로그아웃</SectionSubtitle>
                </div>
                <div className="font-bold">{'>'}</div>
              </div>
            </HorizontalBox>
          </ContentsContainer>
        </ContentSection>
        <ContentSection>
          <ContentsContainer>
            <div className="flex w-full items-center">
              <div className="flex items-center justify-center h-full aspect-square p-4">
                <span className="text-3xl rounded-full bg-primary-bright text-white aspect-square w-full items-center flex justify-center">
                  +
                </span>
              </div>
              <div className="flex items-center w-full justify-evenly">
                <div onClick={goRegisterPetPage}>
                  <p className="text-sm">반려동물 등록 테스트 버튼</p>
                  <SectionSubtitle>반려동물 등록하기</SectionSubtitle>
                </div>
                <div className="font-bold">{'>'}</div>
              </div>
            </div>
          </ContentsContainer>
        </ContentSection>
        <ContentSection>
          <ContentsContainer>
            <div className="flex w-full items-center">
              <HorizontalCenterBox className=" h-full aspect-square p-4">
                <HorizontalCenterBox className="text-3xl rounded-full bg-primary-bright text-white aspect-square w-full">
                  +
                </HorizontalCenterBox>
              </HorizontalCenterBox>
              <HorizontalBox className="w-full justify-evenly">
                <div>
                  <p className="text-sm">현재 사료는 잘 주고 계신가요?</p>
                  <SectionSubtitle>영양분석하기</SectionSubtitle>
                </div>
                <div className="font-bold">{'>'}</div>
              </HorizontalBox>
            </div>
          </ContentsContainer>
        </ContentSection>
      </PageContainer>
    </Layout>
  );
}
