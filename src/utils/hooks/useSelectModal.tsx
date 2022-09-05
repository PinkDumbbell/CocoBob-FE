import { SelectModalContext } from '@/components/SelectModal/SelectModalPortal';
import { useAppDispatch } from '@/store/config';
import { setSelectModalOpened } from '@/store/slices/selectModalSlice';
import { useContext } from 'react';

export default function useSelectModal() {
  const dispatch = useAppDispatch();
  const context = useContext(SelectModalContext);

  const closeModal = () => {
    context.menus = [];
    context.promise = {};
    dispatch(setSelectModalOpened(false));
  };

  const openSelectModal = (menus: string[]) => {
    context.menus = menus;
    return new Promise((resolve) => {
      context.promise = {
        resolve,
      };
      dispatch(setSelectModalOpened(true));
    });
  };

  return [openSelectModal, closeModal];
}
