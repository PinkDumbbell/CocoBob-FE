import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import ChipButton from '@/components/ChipButton';
import Layout from '@/components/layout/Layout';
import { useDeletePetMutation, useGetPetsDetailQuery } from '@/store/api/petApi';
import { useConfirm, useSelectModal, useToastMessage } from '@/utils/hooks';

import { ReactComponent as MaleIcon } from '@/assets/icon/male_icon.svg';
import { ReactComponent as FemaleIcon } from '@/assets/icon/female_icon.svg';
import { ReactComponent as MenuIcon } from '@/assets/icon/dot_menu_icon.svg';
import { useAppSelector } from '@/store/config';

function PetInfoItem({ label, content }: { label: string; content: string }) {
  return (
    <div className="flex gap-3">
      <span className="text-gray-600 w-14">{label}</span>
      <span className="text-gray-800 font-semibold">{content}</span>
    </div>
  );
}

function useDeletePet(petId?: number) {
  const navigate = useNavigate();
  const openToast = useToastMessage();
  const [openPopup] = useConfirm();
  const [skipFetchOnDelete, setSkipFetchOnDelete] = useState(false);
  const [deletePetMutation, response] = useDeletePetMutation();
  const { data, isError, isSuccess } = response;

  const deletePet = async () => {
    if (!petId) return;
    const confirm = await openPopup({
      title: '반려동물 삭제',
      contents: '반려동물을 삭제하시겠습니까?',
    });
    if (confirm) {
      setSkipFetchOnDelete(true);
      deletePetMutation(petId);
    }
  };
  useEffect(() => {
    if (!data || !isSuccess) return;
    navigate('/mypage');
    openToast('반려동물 정보가 삭제되었습니다.', 'success');
  }, [data, isSuccess]);

  useEffect(() => {
    if (!isError) return;
    openToast('반려동물 삭제 중 오류가 발생하였습니다.', 'error');
    setSkipFetchOnDelete(false);
  }, [isError]);

  return {
    skipFetchOnDelete,
    deletePet,
    ...response,
  };
}

export default function PetDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [openMenu] = useSelectModal();

  if (!id) {
    return <Navigate to="/404" replace />;
  }

  const { isLoading, data: petData } = useGetPetsDetailQuery(+id);
  const representativePetId = useAppSelector((state) => state.user.user?.representativeAnimalId);
  const isRepresentativePet = representativePetId === +id;
  const { deletePet } = useDeletePet(+id);

  const year = parseInt(String((petData?.age ?? 0) / 12), 10);
  const month = parseInt(String((petData?.age ?? 0) % 12), 10);
  const ageString = `${year}년 ${month}개월`;
  const bodyWeightString = `${parseInt(petData?.bodyWeight.toString() ?? '', 10)}kg`;

  const selectMenu = async () => {
    const menus = ['정보수정'];
    if (!isRepresentativePet) {
      menus.push('반려동물 삭제');
    }
    const selectedMenu = await openMenu(menus);
    if (!selectedMenu) {
      return;
    }
    if (selectedMenu === '반려동물 삭제') {
      deletePet();
    } else {
      navigate(`/mypage/pets/${id}/edit`);
    }
  };

  return (
    <Layout
      header
      title="우리아이 정보"
      canGoBack
      customRightChild={
        <button type="button" onClick={selectMenu}>
          <MenuIcon />
        </button>
      }
    >
      <div className="px-4 py-6 space-y-4">
        <div className="flex flex-col space-y-5 w-full items-center">
          <div className="w-full flex justify-center items-center">
            <div className="w-28 aspect-square rounded-full overflow-hidden shadow-lg">
              <img src={petData?.thumbnailPath} alt="반려동물 프로필 사진" />
            </div>
          </div>
          <div className="space-y-3">
            {!isLoading && petData && (
              <>
                <div className="flex justify-center items-center space-x-2 w-full">
                  <span className="text-xl font-semibold">{petData.name}</span>
                  <div className="w-6 h-6 bg-gray-200 rounded-full p-1">
                    {petData.sex === 'MALE' ? <MaleIcon /> : <FemaleIcon />}
                  </div>
                </div>
                <div className="flex items-center justify-center w-full flex-wrap gap-3">
                  {petData.isSpayed && <ChipButton filled content="중성화 완료" border={false} />}
                  {petData.isPregnant && <ChipButton filled content="임신중" border={false} />}
                </div>
              </>
            )}
            {isLoading && (
              <>
                <div className="flex justify-center items-center space-x-2 w-full">
                  <span className="text-xl font-semibold"></span>
                  <div className="w-6 h-6 bg-gray-200 rounded-full p-1"></div>
                </div>
                <div className="flex items-center justify-center w-full flex-wrap gap-3"></div>
              </>
            )}
          </div>
        </div>
        <div className="w-full space-y-2">
          <h3 className="text-[1.2rem]">정보</h3>
          <div className="w-full p-4 bg-primary-light rounded-md space-y-2">
            <PetInfoItem label="견종" content={petData?.breedInfo.name ?? '정보 없음'} />
            <PetInfoItem label="나이" content={ageString ?? '정보 없음'} />
            <PetInfoItem label="몸무게" content={bodyWeightString ?? '정보 없음'} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
