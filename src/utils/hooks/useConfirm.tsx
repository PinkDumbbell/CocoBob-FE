import { ReactNode, useContext } from 'react';
import { useAppDispatch } from '@/store/config';
import { setPopupOpened } from '@/store/slices/confirmSlice';
import { ConfirmContext } from '@/components/Confirm/ConfirmPortal';

type ConfirmOpenProps = {
  title: string | ReactNode;
  contents: string | ReactNode;
};

export default function useConfirm() {
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
