import { useNavigate, useSearchParams } from 'react-router-dom';
import { BackButton, HeaderWrapper } from '@/components/layout/Header.style';
import BackButtonImage from '@/assets/icon/header_back.png';
import { ReactComponent as DotMenuIcon } from '@/assets/icon/dot_menu_icon.svg';
import useSelectModal from '@/utils/hooks/useSelectModal';
import { useConfirm, useToastMessage } from '@/utils/hooks';
import { useEffect, useState } from 'react';
import { NoteContents } from './index.style';

const headerStyles = {
  background: 'transparent',
};
function Header({ onClickMenu }: { onClickMenu: () => Promise<void> }) {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <HeaderWrapper style={headerStyles}>
      <div className="flex w-full py-2 items-center justify-between">
        <div className="flex items-center h-full">
          <BackButton onClick={goBack}>
            <img src={BackButtonImage} />
          </BackButton>
        </div>
        <div className="flex items-center h-full">
          <BackButton onClick={onClickMenu}>
            <DotMenuIcon />
          </BackButton>
        </div>
      </div>
    </HeaderWrapper>
  );
}
export default function NotePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentDate = searchParams.get('date');
  const openToast = useToastMessage();
  const [confirm] = useConfirm();
  const [openSelectMenu] = useSelectModal();

  const [isLoading, setIsLoading] = useState(false);
  const [noteData, setNoteData] = useState({ title: '', contents: '', images: [] });

  const handleDeleteNote = async () => {
    const isConfirmedDeleteNote = await confirm({
      title: '글을 삭제 하시겠습니까?',
      contents: '',
    });
    if (!isConfirmedDeleteNote) return;

    openToast('오늘의 일기가 삭제되었습니다.', 'success');
  };
  const openMenu = async () => {
    const selectedMenu = await openSelectMenu(['글 수정', '글 삭제']);

    if (!selectedMenu) return;

    if (selectedMenu === '글 삭제') {
      handleDeleteNote();
    } else if (selectedMenu === '글 수정') {
      openToast('글 수정', 'success');
    }
  };

  useEffect(() => {
    if (!currentDate) {
      navigate('/404', { replace: true });
    }
    setIsLoading(true);
    setTimeout(() => {
      setNoteData({
        title: '오늘의 기록입니다.',
        contents: '태풍 힌남노가 지나가는 중이에요. 무사히 지나갔으면 좋겠네요',
        images: [],
      });
      setIsLoading(false);
    }, 1500);
    console.log(currentDate);
  }, [currentDate]);
  return (
    <div className="relative w-full h-full flex flex-col">
      <Header onClickMenu={openMenu} />
      <div className="bg-primary-light w-full h-1/3 min-h-[200px]"></div>
      <div
        className="bg-white flex-1 rounded-t-[10px] shadow-md -mt-2 p-4 flex flex-col gap-4 overflow-hidden"
        style={{ boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.15)' }}
      >
        <div className="flex flex-col gap-2 py-4">
          <p className="text-center font-bold text-xl">
            {isLoading ? 'Loading...' : noteData.title}
          </p>
          <p className="text-center text-sm text-gray-400">{currentDate}</p>
        </div>
        <div className="w-full h-1 bg-primary-light opacity-50 rounded-[10px]"></div>
        {!isLoading && (
          <>
            <NoteContents>{noteData.contents}</NoteContents>
          </>
        )}
        {isLoading && <div>Loaindg...</div>}
      </div>
    </div>
  );
}
