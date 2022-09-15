import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Button from '@/components/Button';
import Layout from '@/components/layout/Layout';
import { useAppSelector } from '@/store/config';
import { getCurrentPet } from '@/store/slices/userSlice';
import DailyAddWalkModal from '../components/DailyAddWalk';

const AddWalkButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button type="button" onClick={onClick}>
      추가
    </button>
  );
};

export default function WalkHistoryPage() {
  const walkHistory = [];
  const currentPetId = useAppSelector(getCurrentPet);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const date = searchParams.get('date');
  const [addWalkModal, setAddWalkModal] = useState(false);

  const goDailyPage = () => navigate(`/daily?date=${date}`);
  const goWalkRecordPage = () => navigate(`/daily/walk/record?date=${date}`);

  if (!currentPetId)
    return (
      <Layout header title="산책일지" canGoBack onClickGoBack={goDailyPage}>
        <div className="p-4">반려동물 등록이 필요합니다.</div>
      </Layout>
    );
  return (
    <Layout
      header
      title="산책일지"
      canGoBack
      onClickGoBack={goDailyPage}
      customRightChild={
        <div className="flex space-x-4">
          <AddWalkButton onClick={() => setAddWalkModal(true)} />
        </div>
      }
    >
      <div className="w-full max-w-[425px] h-full max-auto flex flex-col p-4">
        <div className="w-full p-4 rounded-[10px] bg-gray-300 flex flex-col items-center space-y-4">
          {walkHistory.length === 0 && <h4>아직 산책기록이 없어요</h4>}
          <Button label="산책하기" onClick={goWalkRecordPage} />
        </div>
      </div>
      {addWalkModal && (
        <DailyAddWalkModal
          closeModal={() => setAddWalkModal(false)}
          date={new Date(date ?? new Date())}
          petId={currentPetId}
        />
      )}
    </Layout>
  );
}
