import { useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import BackButtonImage from '@/assets/icon/header_back.png';
import { ReactComponent as DotMenuIcon } from '@/assets/icon/dot_menu_icon.svg';
import { BackButton, HeaderWrapper } from '@/components/layout/Header.style';
import { useGetNoteQuery, useDeleteNoteMutation, NoteType } from '@/store/api/dailyApi';
import useSelectModal from '@/utils/hooks/useSelectModal';
import { useConfirm, useToastMessage } from '@/utils/hooks';
import { SmallSpinner } from '@/Animation';
import { NoteContents } from './index.style';
import NoteImageSwiper from './components/NoteImageSwiper';

const headerStyles = {
  background: 'transparent',
  paddingRight: '0.4rem',
  paddingLeft: '0.4rem',
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

type NoteHookProps = {
  noteId: number;
  noteData?: NoteType;
};

const useDeleteNote = ({ noteId, noteData }: NoteHookProps) => {
  const navigate = useNavigate();
  const openToast = useToastMessage();
  const [confirm] = useConfirm();

  const [deleteNoteMutation, { isSuccess: isDeleteNoteSuccess, isError: isDeleteNoteError }] =
    useDeleteNoteMutation();

  const deleteNote = async () => {
    const isConfirmedDeleteNote = await confirm({
      contents: <p className="py-10">글을 삭제 하시겠습니까?</p>,
    });
    if (!isConfirmedDeleteNote) return;
    openToast('글을 삭제했습니다.', 'success');
    deleteNoteMutation({ noteId });
  };
  useEffect(() => {
    if (!isDeleteNoteSuccess) {
      return;
    }
    navigate(`/daily?date=${noteData?.date}`, { replace: true });
  }, [isDeleteNoteSuccess]);
  useEffect(() => {
    if (!isDeleteNoteError) {
      return;
    }
    openToast('글 삭제를 실패했습니다.');
  }, [isDeleteNoteError]);

  return deleteNote;
};

const DELETE_NOTE = '글 삭제';
const EDIT_NOTE = '글 수정';
const NOTE_PAGE_MENU = [EDIT_NOTE, DELETE_NOTE];

export default function NotePage() {
  const { id } = useParams();
  if (!id) {
    return <Navigate to="404" />;
  }
  const navigate = useNavigate();
  const [openSelectMenu] = useSelectModal();

  const { data: noteData, isLoading } = useGetNoteQuery({ noteId: parseInt(id, 10) });

  const noteHookProps: NoteHookProps = { noteId: parseInt(id, 10), noteData };
  const deleteNote = useDeleteNote(noteHookProps);

  const handleSelectedMenu = (selectedMenu: string) => {
    if (selectedMenu === DELETE_NOTE) {
      deleteNote();
    } else if (selectedMenu === EDIT_NOTE) {
      navigate('/daily/note/edit', {
        state: {
          date: noteData?.date,
          editState: {
            noteId: parseInt(id, 10),
            noteData,
          },
        },
      });
    }
  };
  const openMenu = async () => {
    const selectedMenu = await openSelectMenu(NOTE_PAGE_MENU);
    if (!selectedMenu) return;
    handleSelectedMenu(selectedMenu as string);
  };

  return (
    <div className="relative w-full h-full flex flex-col">
      <Header onClickMenu={openMenu} />
      {noteData && noteData.images && noteData.images.length > 0 ? (
        <div className="h-[40%] w-full">
          <div className="h-full w-full">
            <NoteImageSwiper images={noteData.images} />
          </div>
        </div>
      ) : (
        <div className="pt-[70px]"></div>
      )}
      <div
        className="bg-white flex-1 rounded-t shadow-md -mt-2 p-4 flex flex-col gap-4 overflow-hidden"
        style={{ boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.15)' }}
      >
        <div className="flex flex-col gap-2 py-4">
          <div className="text-center font-bold text-h3">
            {isLoading ? <SmallSpinner /> : noteData?.title}
          </div>
          <p className="text-center text-p text-secondary-brighter">{noteData?.date}</p>
        </div>
        <div className="w-full h-1 bg-primary-brightest opacity-50 rounded"></div>
        {!isLoading && <NoteContents>{noteData?.note}</NoteContents>}
        {isLoading && <div>Loaindg...</div>}
      </div>
    </div>
  );
}
