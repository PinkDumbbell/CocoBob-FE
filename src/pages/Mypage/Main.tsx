import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Layout from '@/components/layout/Layout';
import { useGetPetsQuery } from '@/store/api/petApi';
import { useChangeRepresentativePetMutation, useGetUserQuery } from '@/store/api/userApi';
import { useConfirm, useLogout, useToastMessage } from '@/utils/hooks';
import settingsIcon from '@/assets/icon/settings_icon.png';

import AddPetBUtton from './components/AddPetButton';
import PetSimpleInfo from './components/PetSimpleInfo';
import {
  FlexColumn,
  MainContentsContainer,
  MainPetListContainer,
  MainPetListItem,
  MainTitleWrapper,
  MypageMenuItem,
} from './index.style';

export default function MypageMain() {
  const navigate = useNavigate();
  const { data: user } = useGetUserQuery();
  const { data: pets, isLoading, isSuccess } = useGetPetsQuery();
  const logout = useLogout();
  const openToast = useToastMessage();
  const [changeRepresentativePetMutation, { isSuccess: isSuccessChangingRepresentativePet }] =
    useChangeRepresentativePetMutation();
  const [confirm] = useConfirm();

  const petList = [
    ...(pets?.filter((pet) => pet.id === user?.representativeAnimalId) ?? []),
    ...(pets?.filter((pet) => pet.id !== user?.representativeAnimalId) ?? []),
  ];

  const changeRepresentativePet = async (petId: number) => {
    changeRepresentativePetMutation(petId);
  };
  const handleChangeRepresentativePet = async (petId: number) => {
    if (user?.representativeAnimalId === petId) {
      return;
    }
    const isConfirmed = await confirm({
      title: '프로필 변경',
      contents: `선택한 반려동물로 프로필을 변경합니다.`,
    });
    if (isConfirmed) {
      changeRepresentativePet(petId);
    }
  };

  useEffect(() => {
    if (!isSuccessChangingRepresentativePet) return;
    openToast('현재 프로필이 수정되었습니다.', 'success');
  }, [isSuccessChangingRepresentativePet]);

  return (
    <Layout
      header
      title="마이페이지"
      footer
      customRightChild={
        <button type="button" onClick={() => navigate('/mypage/profile')}>
          <img src={settingsIcon} />
        </button>
      }
    >
      <MainContentsContainer>
        {isLoading && <p>Loading...</p>}
        {!isLoading && (
          <>
            <FlexColumn className="p-4 gap-1 bg-white">
              <MainTitleWrapper>
                <h2>
                  <span className="text-primary-main">{user?.name}</span>님의 펫탈로그
                </h2>
              </MainTitleWrapper>
              <FlexColumn className="gap-3">
                <div className="flex items-center justify-between">
                  <h3>소중한 가족들</h3>
                  <Link to="/mypage/pets" className="text-caption">
                    전체보기
                  </Link>
                </div>

                <MainPetListContainer>
                  {isSuccess &&
                    petList.map((pet, idx) => (
                      <MainPetListItem
                        className={idx === 0 ? 'border-primary-main' : ''}
                        key={idx}
                        onClick={() => handleChangeRepresentativePet(pet.id)}
                      >
                        <PetSimpleInfo {...pet} />
                      </MainPetListItem>
                    ))}
                  <AddPetBUtton />
                </MainPetListContainer>
              </FlexColumn>
            </FlexColumn>
            <FlexColumn className="bg-white">
              {[{ page: '찜한 제품', path: '/mypage/wish' }].map((menu, idx) => (
                <MypageMenuItem key={idx}>
                  <Link to={menu.path}>
                    <h5>{menu.page}</h5>
                  </Link>
                </MypageMenuItem>
              ))}
              <MypageMenuItem>
                <button onClick={logout}>
                  <h5>로그아웃</h5>
                </button>
              </MypageMenuItem>
            </FlexColumn>
          </>
        )}
      </MainContentsContainer>
    </Layout>
  );
}
