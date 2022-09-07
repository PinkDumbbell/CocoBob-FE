/* eslint-disable no-use-before-define */
import { ReactNode, useContext } from 'react';
import { useAppDispatch } from '@/store/config';
import { setPopupOpened } from '@/store/slices/confirmSlice';
import { ConfirmContext } from '@/components/Confirm/ConfirmPortal';

type ConfirmOpenProps = {
  title: string | ReactNode;
  contents?: string | ReactNode;
};

export default function useConfirm() {
  const dispatch = useAppDispatch();
  const confirmContext = useContext(ConfirmContext);

  function onKeyDownESC(event: KeyboardEvent) {
    if (event.key !== 'Escape') return;
    hidePopup();
  }

  function openPopup({ title, contents }: ConfirmOpenProps) {
    confirmContext.title = title;
    confirmContext.contents = contents;
    dispatch(setPopupOpened(true));
    window.addEventListener('keydown', onKeyDownESC);
    return new Promise((resolve) => {
      confirmContext.promiseInfo = {
        resolve,
      };
    });
  }

  function hidePopup() {
    dispatch(setPopupOpened(false));
    window.removeEventListener('keydown', onKeyDownESC);
  }

  return [openPopup, hidePopup];
}
