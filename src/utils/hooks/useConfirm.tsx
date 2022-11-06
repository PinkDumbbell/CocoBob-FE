/* eslint-disable no-use-before-define */
import { ReactNode, useContext } from 'react';
import { useAppDispatch } from '@/store/config';
import { setPopupOpened } from '@/store/slices/confirmSlice';
import { ConfirmContext } from '@/components/Confirm/ConfirmPortal';
import useKeyHandler from './useKeyHandler';

type ConfirmOpenProps = {
  title?: string | ReactNode;
  contents: string | ReactNode;
};

export default function useConfirm() {
  useKeyHandler('Escape', hidePopup);
  const dispatch = useAppDispatch();
  const confirmContext = useContext(ConfirmContext);

  function openPopup({ title, contents }: ConfirmOpenProps) {
    confirmContext.title = title;
    confirmContext.contents = contents;
    dispatch(setPopupOpened(true));

    return new Promise((resolve) => {
      confirmContext.promiseInfo = {
        resolve,
      };
    });
  }

  function hidePopup() {
    dispatch(setPopupOpened(false));
  }

  return [openPopup, hidePopup];
}
