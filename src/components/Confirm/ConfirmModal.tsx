import { useContext } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/config';
import { isPopupOpened, setPopupOpened } from '@/store/slices/confirmSlice';
import { ConfirmContext } from './ConfirmPortal';
import { Background, ContentsWrapper, RejectButton, SubmitButton } from './ConfirmModal.style';

export default function ConfirmModal() {
  const dispatch = useAppDispatch();
  const popupOpened = useAppSelector(isPopupOpened);
  const { contents, promiseInfo } = useContext(ConfirmContext);

  const closePopup = () => dispatch(setPopupOpened(false));
  const handleReject = () => {
    if (promiseInfo?.resolve) {
      promiseInfo.resolve(false);
      closePopup();
    }
  };
  const handleSubmit = () => {
    if (promiseInfo?.resolve) {
      promiseInfo.resolve(true);
      closePopup();
    }
  };
  if (!popupOpened) return null;
  return (
    <Background>
      <ContentsWrapper>
        <div className="px-4 flex items-center justify-center flex-1 overflow-y-auto w-full h-22">
          {contents}
        </div>
        <div className="flex items-center justify-evenly">
          <RejectButton type="button" onClick={handleReject}>
            취소
          </RejectButton>
          <SubmitButton type="button" onClick={handleSubmit}>
            확인
          </SubmitButton>
        </div>
      </ContentsWrapper>
    </Background>
  );
}
