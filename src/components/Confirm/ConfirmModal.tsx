import { useAppDispatch, useAppSelector } from '@/store/config';
import { isPopupOpened, setPopupOpened } from '@/store/slices/confirmSlice';
import { ReactNode, useContext } from 'react';
import { Background, ContentsWrapper, RejectButton, SubmitButton } from './ConfirmModal.style';
import { ConfirmContext } from './ConfirmPortal';

type ConfirmOpenProps = {
  title: string | ReactNode;
  contents: string | ReactNode;
};

export function useConfirm() {
  const dispatch = useAppDispatch();
  const confirmContext = useContext(ConfirmContext);

  const openPopup = async ({ title, contents }: ConfirmOpenProps) => {
    confirmContext.title = title;
    confirmContext.contents = contents;
    dispatch(setPopupOpened(true));
    return new Promise((resolve) => {
      confirmContext.promiseInfo = {
        resolve,
      };
    });
  };

  const hidePopup = () => {
    dispatch(setPopupOpened(false));
  };

  return [openPopup, hidePopup];
}

export default function ConfirmModal() {
  const dispatch = useAppDispatch();
  const popupOpened = useAppSelector(isPopupOpened);
  const { title, contents, promiseInfo } = useContext(ConfirmContext);

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
        <div className="space-y-2">
          <div>{title}</div>
          <div className="overflow-y-auto">{contents}</div>
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
