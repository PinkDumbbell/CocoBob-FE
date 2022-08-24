/* eslint-disable no-nested-ternary */
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGetUserQuery } from '@/store/api/userApi';
import useLogout from '@/utils/hooks/useLogout';
import useCurrentPet from '@/utils/hooks/useCurrentPet';
import Layout from '@/components/layout/Layout';
import ContentsContainer from '@/components/ContentsContainer';
import doctor from '@/assets/image/main_doctor.png';

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

export default function Main() {
  const navigate = useNavigate();
  const { data: pet } = useCurrentPet();
  const { data } = useGetUserQuery();

  const onClickLogout = useLogout();
  const goRegisterPetPage = () => navigate('/register');
  const goProductsRecommendPage = () => navigate('/products/recommend');

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
        <ContentSection>
          <MainContentButton
            label="반려동물 맞춤 제품을 추천해드려요!"
            title="추천 제품 보러가기"
            onClick={goProductsRecommendPage}
          />
          <MainContentButton
            label="소중한 가족을 소개해주세요"
            title="반려동물 등록하기"
            onClick={goRegisterPetPage}
          />
          <MainContentButton label="현재 사료는 잘 주고 계신가요?" title="영양분석하기" />
          <MainContentButton title="로그아웃하기" onClick={onClickLogout} />
        </ContentSection>
      </PageContainer>
    </Layout>
  );
}
